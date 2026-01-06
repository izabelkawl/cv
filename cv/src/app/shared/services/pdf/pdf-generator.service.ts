import { inject, Injectable } from '@angular/core';
import { IPersonalInformation } from '@app/components/base-layout/base-layout.interface';
import { TranslateService } from '@ngx-translate/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LangType } from '../lang/lang.interface';
import { Colors } from '@app/shared/enums/variables';
import { LinkPipe } from '@app/shared/pipes/link.pipe';
import { ISection } from '@app/components/content/section/section.interface';

(pdfMake as any).vfs = pdfFonts.vfs;
const url =  `${window.location.origin}${window.location.origin.includes('localhost') ? '' : '/cv'}`;

(pdfMake as any).fonts = {
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

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  readonly #translateService = inject(TranslateService);
  readonly #linkPipe = inject(LinkPipe);

  page = {
    width: 595,
    height: 842,
  };

  fonts = {
    light: 'Montserrat-Light',
    medium: 'Montserrat-Medium',
    bold: 'Montserrat-Bold',
    lightItalic: 'Montserrat-LightItalic',
    semiBold: 'Montserrat-SemiBold',
    extraBold: 'Montserrat-ExtraBold',
  };

  colors = {
    white: this.getDocumentColor(Colors.WHITE),
    basic: this.getDocumentColor(Colors.BASIC),
    textColor: this.getDocumentColor(Colors.TEXT_COLOR),
    lightBeigeColor: this.getDocumentColor(Colors.LIGHT_BEIGE),
    lightGray: this.getDocumentColor(Colors.LIGHT_GRAY),
    darkGray: this.getDocumentColor(Colors.DARK_GRAY),
    black: this.getDocumentColor(Colors.BLACK),
  };

  getDocumentColor(color: string): string {
    return getComputedStyle(document.body).getPropertyValue(color);
  }

  generateSection(header: string, data: ISection[], darkMode?: boolean): any[] {
    const width =
      this.page.width * (darkMode ? 0.65 : 0.35) - 15 * (darkMode ? 6 : 2);
    const style = darkMode ? 'headerDark' : 'header';
    const color = darkMode ? this.colors.textColor : this.colors.white;

    const sectionHeader = [
      {
        margin: [0, 20, 0, 0],
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
        items.push(
          {
            margin: [0, 15, 0, 5],
            columns: [
              {
                text: title,
                font: this.fonts.bold,
                style: 'subTitle',
                color,
              },
              {
                text: period,
                font: this.fonts.lightItalic,
                alignment: 'right',
                style: 'subTitle',
                color,
              },
            ],
          },
          {
            margin: [0, 0, 0, 5],
            text: subTitle,
            font: this.fonts.medium,
            style: 'subTitle',
            color,
          },
        );
      }

      (description ?? []).forEach((desc, i) => {
        const textarray: any[] = [];
        desc.split('**').forEach((text, index) => {
          if (index === 0) {
            textarray.push({
              text: '•  ',
              font: this.fonts.extraBold,
              color,
            });
          }
          textarray.push({
            text: text,
            font: index % 2 ? this.fonts.bold : this.fonts.light,
            style: 'sectionText',
            color,
          });
        });
        items.push({
          margin: [
            10,
            i || darkMode ? 0 : 10,
            0,
            i === items.length - 1 ? 20 : 0,
          ],
          text: textarray,
        });
      });
    });

    return sectionHeader.concat(items);
  }

  generatePdf(data: IPersonalInformation, lang: LangType): void {
    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [30, 30, 30, 60],

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
            w: this.page.width * 0.35,
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
            h: 200,
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
            absolutePosition: { x: 0, y: 45 },
          },
        ];

        if (currentPage === pageCount) {
          stack.unshift(
            {
              canvas: [
                {
                  type: 'rect',
                  x: 0,
                  y: 0,
                  w: this.page.width,
                  h: 60,
                  color: this.colors.white,
                },
              ],
              absolutePosition: { x: 0, y: 0 },
            },
            {
              margin: [30, 10, 30, 0],
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
              width: '35%',
              margin: [15, 140, 0, 15],
              stack: [
                {
                  text: this.#translateService.instant('PERSONAL_DATA.PROFILE'),
                  font: this.fonts.bold,
                  style: 'header',
                },
                {
                  canvas: [
                    {
                      type: 'rect',
                      x: 0,
                      y: 10,
                      w: this.page.width * 0.35 - 15 * 2,
                      h: 0.5,
                      color: this.colors.white,
                    },
                  ],
                },
                {
                  margin: [0, 15, 0, 0],
                  text: data.info.description,
                  style: 'description',
                  font: this.fonts.light,
                },

                {
                  margin: [0, 20, 0, 0],
                  text: [
                    'tel. ',
                    { text: data.info.phone, font: this.fonts.bold },
                  ],
                  font: this.fonts.light,
                  style: 'text',
                },
                {
                  text: [
                    'email. ',
                    { text: data.info.email, font: this.fonts.bold },
                  ],
                  font: this.fonts.light,
                  style: 'text',
                },
                {
                  text: [
                    'github. ',
                    {
                      text: this.#linkPipe.transform(data.info.github),
                      font: this.fonts.bold,
                      link: data.info.github,
                    },
                  ],
                  font: this.fonts.light,
                  style: 'text',
                },
                {
                  text: [
                    'linkedIn. ',
                    {
                      text: this.#linkPipe.transform(data.info.linkedIn),
                      font: this.fonts.bold,
                      link: data.info.linkedIn,
                    },
                  ],
                  font: this.fonts.light,
                  style: 'text',
                },
                {
                  text: this.#linkPipe.transform(data.info.website),
                  link: data.info.website,
                  font: this.fonts.bold,
                  style: 'text',
                },
                {
                  text: data.info.city,
                  font: this.fonts.bold,
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
              width: '65%',
              margin: [45, 40, 0, 15],
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
                  style: 'subHeader',
                  font: this.fonts.medium,
                  margin: [0, 0, 0, 50],
                },

                this.generateSection('EXPERIENCE', data.experience, true),
                this.generateSection('EDUCATION', data.education, true),
              ],
            },
          ],
        },
      ],

      styles: {
        header: {
          fontSize: 20,
          lineHeight: 0.9,
          color: this.colors.white,
        },
        headerDark: {
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
          fontSize: 9,
          lineHeight: 1.3,
          color: this.colors.white,
        },
        subTitle: {
          fontSize: 12,
          color: this.colors.textColor,
        },
        sectionText: {
          fontSize: 9,
          lineHeight: 1.2,
        },
        firstName: {
          fontSize: 30,
          lineHeight: 0.6,
          color: this.colors.textColor,
        },
        lastName: {
          fontSize: 32,
          lineHeight: 0.6,
          color: this.colors.basic,
        },
        subHeader: {
          fontSize: 18,
          lineHeight: 0.4,
          color: this.colors.textColor,
        },
        footer: {
          fontSize: 7,
          color: this.colors.lightGray,
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(
        `${data.info.firstName} ${
          data.info.lastName
        } CV ${lang.toUpperCase()}.pdf`,
      );
  }
}
