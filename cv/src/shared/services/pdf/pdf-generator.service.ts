import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { jsPDF } from 'jspdf';
import { IExperienceEducation } from 'src/app/components/experience-education/experience-education.interface';
import { InfoKeys } from 'src/app/components/user-info/user-info.interfaces';
import { ISkills } from 'src/app/components/skills/skills.interfaces';
import {
  IPersonalInformation,
  SectionTypes,
} from 'src/app/main/main.interface';
import pSBC from 'shade-blend-color';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private translateService: TranslateService) {}

  geratePdf(data: IPersonalInformation): void {
    const pdf = new jsPDF();
    const fontFamily: string = 'Ruda-Regular';
    const fontFamilyBold: string = 'Ruda-Bold';
    const pageSize = { width: 210, height: 297 };
    const translateService = this.translateService;
    const { person, avatar = '' } = data.info;
    const [fistName, lastName] = person.split(' ');
    const primary =
    getComputedStyle(document.body).getPropertyValue('--basic-color');
      
    const black = '#000';

    pdf.addFileToVFS(`assets/font/${fontFamily}.ttf`, `${fontFamily}.ttf`);
    pdf.addFileToVFS(`assets/font/${fontFamilyBold}.ttf`, `${fontFamilyBold}.ttf`);
    pdf.addFont(`./assets/font/${fontFamily}.ttf`, fontFamily, 'normal');
    pdf.addFont(`./assets/font/${fontFamilyBold}.ttf`, fontFamilyBold, 'normal');
    pdf.setFont(fontFamily);

    let y = 20;
    let infoPosition = 32;

    function getY(i: number, step: number = 10): number {
      y = i + step;
      return y;
    }

    function geTranslation(name: SectionTypes): string {
      return translateService.instant(name as string);
    }

    function createSection(type: SectionTypes): void {
      pdf.setFontSize(12);
      pdf.setFont(fontFamilyBold);
      pdf.setTextColor(primary);
      pdf.text(geTranslation(type).toUpperCase(), 20, getY(y));

      y -= 10;

      data[type].map((item: IExperienceEducation & ISkills, index: number) => {
        const { title, company, description, name, level } = item;
        const half = name && index > data[type]?.length / 2;

        let sectionX = half ? 140 : 65;
        let sectionY = half ? y - 90 + index * 10 : getY(y);

        pdf.setFontSize(12);
        pdf.setTextColor(primary);
        pdf.text(title ?? name, sectionX, sectionY);

        pdf.setFontSize(10);
        if (level) {
          let i = 0;
          while (i < level) {
            pdf.addImage(
              `assets/img/rocket_locked.png`,
              'PNG',
              sectionX + 30 + i * 6,
              sectionY - 4,
              5,
              5,
              'FAST'
            );
            i++;
          }
        } else {
          pdf.text(company, 65, getY(y));
        }

        if (description) {
          pdf.setFont(fontFamily);
          pdf.setTextColor(black);
          pdf.setFontSize(8);
          description.forEach((desc: string, i: number) => {
            pdf.text('\u2022 ' + desc, 70, getY(i ? y : y + 2, 5));
          });
        }
      });
      y += 5;
    }

    function getInfo(name: InfoKeys): void {
      pdf.text(
        geTranslation('sections.info.' + name) + ': ' + data.info[name],
        190,
        infoPosition,
        { align: 'right' }
      );
      infoPosition += 5;
    }

    const backgroup: string = pSBC(0.9, primary) as string;
    pdf.setFillColor(backgroup);
    pdf.rect(0, 0, (pageSize.width / 5) * 2, pageSize.height, 'F');

    pdf.addImage(avatar, 'JPEG', 20, getY(y) - 5, 35, 35);

    pdf.setFontSize(40);
    pdf.setTextColor(primary);
    pdf.setFont(fontFamilyBold);
    pdf.text(fistName.toUpperCase(), 65, 40);
    pdf.text(lastName.toUpperCase(), 65, 55);

    pdf.setFont(fontFamily);
    pdf.setFontSize(10);
    getInfo('phone');
    getInfo('email');
    getInfo('linkedIn');

    y += 40;
    createSection('experience');
    createSection('education');
    createSection('skills');

    pdf.save('Izabela Wlazło CV.pdf');
  }
}
