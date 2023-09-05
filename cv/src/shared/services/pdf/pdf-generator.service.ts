import { ISkills, InfoKeys, SectionTypes } from './../../../app/app.interface';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { jsPDF } from 'jspdf';
import {
  IExperienceEducation,
  IPersonalInformation,
} from 'src/app/app.interface';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private translateService: TranslateService) {}

  geratePdf(data: IPersonalInformation): void {
    const pdf = new jsPDF();

    pdf.addFileToVFS('assets/font/Signika-Light.ttf', 'Signika-Light.ttf');
    pdf.addFont('./assets/font/Signika-Light.ttf', 'Signika', 'normal');
    pdf.setFont('Signika');

    const ts = this.translateService;
    const { person, avatar = '' } = data.info;
    const [fistName, lastName] = person.split(' ');

    let y = 20;
    let infoPosition = 35;

    function iterate(k: number, step = 10): number {
      y = k + step;
      return y;
    }

    function translate(name: SectionTypes): string {
      return ts.instant(name as string);
    }

    function sectionName(name: SectionTypes): void {
      pdf.text(translate(name).toUpperCase(), 20, iterate(y));
    }

    function createSectionBody(name: SectionTypes): void {
      pdf.setFontSize(12);
      sectionName(name);

      y -= 10;

      data[name].map((item: IExperienceEducation & ISkills) => {
        const { title, company, description, name, level } = item;

        pdf.setFontSize(12);
        pdf.text(title ?? name, 60, iterate(y));

        pdf.setFontSize(10);
        pdf.text(
          company ?? level.toString(),
          level ? 60 + 30 : 60,
          level ? y : iterate(y)
        );

        if (description) {
          pdf.setFontSize(8);
          description.forEach((desc: string, i: number) => {
            pdf.text('\u2022 ' + desc, 62, iterate(i ? y : y + 2, 5));
          });
        }
      });
    }

    function setInfo(name: InfoKeys): void {
      pdf.text(
        translate('sections.info.' + name) + ': ' + data.info[name],
        180,
        infoPosition,
        {
          align: 'right',
        }
      );
      infoPosition += 5;
    }

    const pageSize = {
      width: 210,
      height: 297,
    };
    pdf.setFillColor(248, 248, 248);
    pdf.rect(0, 0, (pageSize.width / 5) * 2, pageSize.height, 'F');

    pdf.addImage(avatar, 'JPEG', 25, iterate(y), 30, 30);

    pdf.setFontSize(30);
    pdf.text(fistName.toUpperCase(), 70, 40);
    pdf.text(lastName.toUpperCase(), 70, 50);

    pdf.setFontSize(10);
    setInfo('phone');
    setInfo('email');
    setInfo('linkedIn');

    y += 40;

    createSectionBody('experience');
    createSectionBody('education');
    createSectionBody('skills');

    pdf.save('Izabela Wlazło CV.pdf');
  }
}
