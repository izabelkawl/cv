import { inject, Injectable } from '@angular/core';
import { IPersonalInformation } from '@app/components/base-layout/base-layout.interface';
import { ISection } from '@app/components/content/section/section.interface';
import { Colors } from '@app/shared/enums/variables';
import { LinkPipe } from '@app/shared/pipes/link.pipe';
import { TranslateService } from '@ngx-translate/core';
import * as pdfMakeModule from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LangType } from '../lang/lang.interface';

const url = `${window.location.origin}${
  window.location.origin.includes('localhost') ? '' : '/cv'
}`;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private pdfMake = (pdfMakeModule as any).default || pdfMakeModule;

  constructor() {
    this.pdfMake['vfs'] = pdfFonts['vfs'];
    this.pdfMake.fonts = {
      'Montserrat-Light': {
        normal: `${url}/assets/font/Montserrat-Light.ttf`,
      },
      'Montserrat-Medium': {
        normal: `${url}/assets/font/Montserrat-Medium.ttf`,
      },
      'Montserrat-Bold': {
        normal: `${url}/assets/font/Montserrat-Bold.ttf`,
      },
      'Montserrat-LightItalic': {
        normal: `${url}/assets/font/Montserrat-LightItalic.ttf`,
      },
      'Montserrat-SemiBold': {
        normal: `${url}/assets/font/Montserrat-SemiBold.ttf`,
      },
      'Montserrat-ExtraBold': {
        normal: `${url}/assets/font/Montserrat-ExtraBold.ttf`,
      },
    };
  }

  readonly #translateService = inject(TranslateService);
  readonly #linkPipe = inject(LinkPipe);

  page = {
    width: 595,
    height: 842,
    grayBoxHeight: 200,
    leftBox: 35,
    rightBox: 65,
  };

  fonts = {
    light: 'Montserrat-Light',
    medium: 'Montserrat-Medium',
    bold: 'Montserrat-Bold',
    lightItalic: 'Montserrat-LightItalic',
    semiBold: 'Montserrat-SemiBold',
    extraBold: 'Montserrat-ExtraBold',
  };

  get colors() {
    return {
      white: this.getDocumentColor(Colors.WHITE),
      basic: this.getDocumentColor(Colors.BASIC),
      textColor: this.getDocumentColor(Colors.TEXT_COLOR),
      lightBeigeColor: this.getDocumentColor(Colors.LIGHT_BEIGE),
      lightGray: this.getDocumentColor(Colors.LIGHT_GRAY),
      darkGray: this.getDocumentColor(Colors.DARK_GRAY),
      black: this.getDocumentColor(Colors.BLACK),
    };
  }

  getDocumentColor(color: string): string {
    return getComputedStyle(document.body).getPropertyValue(color).trim();
  }

  hasValue(value?: string | null): boolean {
    return !!value?.trim();
  }

  generateSection(header: string, data: ISection[], darkMode?: boolean): any[] {
    const width =
      (this.page.width * (darkMode ? this.page.rightBox : this.page.leftBox)) /
        100 -
      (darkMode ? 70 : 15 * 2);
    const style = darkMode ? 'headerDarkFont' : 'headerFont';
    const color = darkMode ? this.colors.textColor : this.colors.white;

    const sectionHeader = [
      {
        margin: [0, 10, 0, 0],
        text: this.#translateService.instant('SECTIONS.' + header),
        font: this.fonts.bold,
        style,
      },
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 15,
            w: width,
            h: 0.5,
            color,
          },
        ],
      },
    ];

    const items: any[] = [];

    data.forEach((item) => {
      const { title, subTitle, period, description } = item;

      if (title) {
        items.push({
          margin: [0, 10, 0, 5],
          columns: [
            {
              text: title,
              font: this.fonts.bold,
              style: 'mediumFont',
              color,
              width: '66%',
            },
            {
              text: period,
              font: this.fonts.lightItalic,
              alignment: 'right',
              style: 'mediumFont',
              color,
            },
          ],
        });
      }

      if (subTitle) {
        items.push({
          margin: darkMode ? [] : [0, 15, 0, 0],
          text: subTitle,
          font: darkMode ? this.fonts.semiBold : this.fonts.light,
          style: 'text',
          color: darkMode ? this.colors.basic : this.colors.white,
        });
      }

      (description ?? []).forEach((desc, i) => {
        const textarray: any[] = [];
        desc.split('**').forEach((text, index) => {
          if (darkMode && index === 0) {
            textarray.push({
              text: '•  ',
              font: this.fonts.extraBold,
              color,
            });
          }
          textarray.push({
            text: text,
            font: index % 2 ? this.fonts.bold : this.fonts.light,
            style: 'listItem',
            color,
          });
        });
        items.push({
          margin: darkMode ? [10, 0, 0, 0] : [],
          text: textarray,
        });
      });
    });

    return sectionHeader.concat(items);
  }

  generatePdf(data: IPersonalInformation, lang: LangType): void {
    const githubRow = this.hasValue(data.info.github)
      ? {
          text: [
            'github: ',
            {
              text: this.#linkPipe.transform(data.info.github),
              font: this.fonts.semiBold,
              link: data.info.github,
            },
          ],
          font: this.fonts.light,
          style: 'text',
        }
      : null;

    const linkedInRow = this.hasValue(data.info.linkedIn)
      ? {
          text: [
            'linkedIn: ',
            {
              text: this.#linkPipe.transform(data.info.linkedIn),
              font: this.fonts.semiBold,
              link: data.info.linkedIn,
            },
          ],
          font: this.fonts.light,
          style: 'text',
        }
      : null;

    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [30, 30, 30, 40],

      background: (
        currentPage: number,
        page: {
          width: number;
          height: number;
          orientation: string;
        },
      ) => {
        const canvas = [
          {
            type: 'rect',
            x: 15 * 2,
            y: currentPage === 1 ? 15 * 2 : 0,
            w: (this.page.width * this.page.leftBox) / 100,
            h: page.height - 15 * 2,
            color: this.colors.basic,
          },
        ];

        if (currentPage === 1) {
          canvas.unshift({
            type: 'rect',
            x: 15,
            y: 0,
            w: this.page.width - 15 * 2,
            h: this.page.grayBoxHeight,
            color: this.colors.lightBeigeColor,
          });
        }

        return { canvas };
      },

      footer: (currentPage: number, pageCount: number) => {
        const stack: any[] = [
          {
            text:
              lang === 'en'
                ? `Page ${currentPage} of ${pageCount}`
                : `Strona ${currentPage} z ${pageCount}`,
            alignment: 'center',
            font: this.fonts.light,
            style: 'footer',
            absolutePosition: { x: 0, y: 35 },
          },
        ];

        if (pageCount === 1) {
          stack.pop();
        }

        if (currentPage === pageCount) {
          stack.unshift(
            {
              canvas: [
                {
                  type: 'rect',
                  x: 0,
                  y: 0,
                  w: this.page.width,
                  h: docDefinition.pageMargins[3],
                  color: this.colors.white,
                },
              ],
              absolutePosition: { x: 0, y: 0 },
            },
            {
              margin: [
                docDefinition.pageMargins[0],
                10,
                docDefinition.pageMargins[2],
                0,
              ],
              text: data.clause,
              alignment: 'justify',
              font: this.fonts.light,
              style: 'footer',
            },
          );
        }

        return { stack };
      },

      content: [
        {
          columns: [
            {
              width: this.page.leftBox + '%',
              margin: [15, this.page.grayBoxHeight - 60, 0, 15],
              stack: [
                {
                  text: this.#translateService.instant('PERSONAL_DATA.PROFILE'),
                  font: this.fonts.bold,
                  style: 'headerFont',
                },
                {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 10,
                      w: (this.page.width * this.page.leftBox) / 100 - 15 * 2,
                      h: 0.5,
                      color: this.colors.white,
                    },
                  ],
                },
                {
                  margin: [0, 15, 0, 0],
                  text: data.info.description,
                  style: 'description',
                  font: this.fonts.medium,
                },

                {
                  margin: [0, 20, 0, 0],
                  text: [
                    'tel: ',
                    { text: data.info.phone, font: this.fonts.semiBold },
                  ],
                  font: this.fonts.light,
                  style: 'text',
                },
                {
                  text: [
                    'email: ',
                    { text: data.info.email, font: this.fonts.semiBold },
                  ],
                  font: this.fonts.light,
                  style: 'text',
                },
                ...(githubRow ? [githubRow] : []),
                ...(linkedInRow ? [linkedInRow] : []),
                // {
                //   text: this.#linkPipe.transform(data.info.website),
                //   link: data.info.website,
                //   font: this.fonts.semiBold,
                //   style: 'text',
                // },
                {
                  text: data.info.city,
                  font: this.fonts.semiBold,
                  style: 'text',
                },
                this.generateSection(
                  'SPECIALIZATION',
                  data.specializations,
                  false,
                ),
              ],
            },
            {
              width: this.page.rightBox + '%',
              margin: [45, this.page.grayBoxHeight - 150, 0, 0],
              stack: [
                {
                  text: data.info.firstName.toUpperCase(),
                  style: 'firstName',
                  font: this.fonts.medium,
                },
                {
                  margin: [0, 10, 0, 15],
                  text: data.info.lastName.toUpperCase(),
                  style: 'lastName',
                  font: this.fonts.extraBold,
                },
                {
                  text: data.info.position,
                  style: 'positionFont',
                  font: this.fonts.medium,
                  margin: [0, 0, 0, 40],
                },

                this.generateSection('EXPERIENCE', data.experience, true),
                this.generateSection('EDUCATION', data.education, true),
              ],
            },
          ],
        },
      ],

      styles: {
        firstName: {
          fontSize: 28,
          lineHeight: 0.6,
          color: this.colors.textColor,
        },
        lastName: {
          fontSize: 40,
          lineHeight: 0.6,
          color: this.colors.basic,
        },
        positionFont: {
          fontSize: 18,
          lineHeight: 0.4,
          color: this.colors.textColor,
        },
        headerFont: {
          fontSize: 20,
          lineHeight: 0.9,
          color: this.colors.white,
        },
        headerDarkFont: {
          fontSize: 20,
          lineHeight: 0.9,
          color: this.colors.textColor,
        },
        description: {
          fontSize: 10,
          lineHeight: 1.1,
          color: this.colors.white,
        },
        text: {
          fontSize: 10,
          lineHeight: 1.3,
          color: this.colors.white,
        },
        mediumFont: {
          fontSize: 12,
          color: this.colors.textColor,
        },
        listItem: {
          fontSize: 10,
          lineHeight: 1.2,
        },
        footer: {
          fontSize: 8,
          color: this.colors.lightGray,
        },
      },
    };

    this.pdfMake
      .createPdf(docDefinition)
      .download(
        `${data.info.firstName} ${
          data.info.lastName
        } CV ${lang.toUpperCase()}.pdf`,
      );
  }
}
