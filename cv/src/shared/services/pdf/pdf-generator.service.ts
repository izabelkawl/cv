import { SectionTypes } from './../../../app/app.interface';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { jsPDF } from 'jspdf';
import { IPersonalInformation } from 'src/app/app.interface';
import { IExperienceEducation } from 'src/app/components/experience-education/experience-education.interface';
import { InfoKeys } from 'src/app/components/personal-info/personal-info.interfaces';
import { ISkills } from 'src/app/components/skills/skills.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private translateService: TranslateService) {}

  geratePdf(data: IPersonalInformation): void {
    const pdf = new jsPDF();
    const fontFamily: 'Ruda-Regular' = 'Ruda-Regular';
    const pageSize = { width: 210, height: 297 };
    const translateService = this.translateService;
    const { person, avatar = '' } = data.info;
    const [fistName, lastName] = person.split(' ');

    pdf.addFileToVFS(`assets/font/${fontFamily}.ttf`, `${fontFamily}.ttf`);
    pdf.addFont(`./assets/font/${fontFamily}.ttf`, fontFamily, 'normal');
    pdf.setFont(fontFamily);

    let y = 20;
    let infoPosition = 35;

    function getY(i: number, step: number = 10): number {
      y = i + step;
      return y;
    }

    function geTranslation(name: SectionTypes): string {
      return translateService.instant(name as string);
    }

    function createSection(type: SectionTypes): void {
      pdf.setFontSize(12);
      pdf.text(geTranslation(type).toUpperCase(), 20, getY(y));

      y -= 10;

      data[type].map((item: IExperienceEducation & ISkills, index: number) => {
        const { title, company, description, name, level } = item;
        const half = name && index > data[type]?.length / 2;

        let sectionX = half ? 140 : 60;
        let sectionY = half ? y - 90 + index * 10 : getY(y);

        pdf.setFontSize(12);
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
          pdf.text(company, 60, getY(y));
        }

        if (description) {
          pdf.setFontSize(8);
          description.forEach((desc: string, i: number) => {
            pdf.text('\u2022 ' + desc, 62, getY(i ? y : y + 2, 5));
          });
        }
      });
      y += 5;
    }

    function getInfo(name: InfoKeys): void {
      pdf.text(
        geTranslation('sections.info.' + name) + ': ' + data.info[name],
        180,
        infoPosition,
        { align: 'right' }
      );
      infoPosition += 5;
    }

    pdf.setFillColor(248, 248, 248);
    pdf.rect(0, 0, (pageSize.width / 5) * 2, pageSize.height, 'F');

    pdf.addImage(avatar, 'JPEG', 25, getY(y), 30, 30);

    pdf.setFontSize(30);
    pdf.text(fistName.toUpperCase(), 70, 40);
    pdf.text(lastName.toUpperCase(), 70, 50);

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
