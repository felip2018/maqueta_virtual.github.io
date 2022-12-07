import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import IDataFile from './models/data.inteface';
import IEvaluation from './models/evaluation.interface';
import { ValidationsService } from './services/validations.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  canStart = false;
  dataFile: IDataFile[] = [];
  evaluations: IEvaluation[] = [
    {"field": "grupo", "condition": "igual", "valor": "4"},
    {"field": "grupo", "condition": "igual", "valor": "7"},
    {"field": "socializacion", "condition":"mayor", "valor":"4.5"}
  ];
  conditions: string = JSON.stringify(this.evaluations);
  processingHtml: string = '';
  diagnosticHtml: string = '';

  constructor(private validationService: ValidationsService) {

  }

  ngOnInit() {
    Swal.fire({
      title: '<strong>Matemáticas discretas</strong><p>Maqueta virtual</p>',
      icon: 'info',
      html:`<div style="text-align: left;">
              <strong>Nrc: </strong> 54478 <br>
              <strong>Grupo: </strong> 4 <br>
              <strong>Participantes: </strong><br>
              <ul>
                <li>Yury Jasbleidy Silva Arevalo</li>
                <li>Miguel Felipe Peñuela Garzon</li>
                <li>Pedro Alonso Bolivar Gonzalez</li>
                <li>Kevin Daniel Hurtado Reyes</li>
                <li>Miguel Alfonso Jimenez Merchan</li>
              </ul>
            </div>`
    });
  }

  public getDataFile(event: any) {
    this.dataFile = event;
    if (this.dataFile) {
      this.canStart = true;
    }
  }

  public startProcess() {
    this.processingHtml = '<img src="/assets/img/processing-gif-1.gif" alt="processing-gif-1.gif" style="width:150px;"/>'

    const validations: IEvaluation[]  = JSON.parse(this.conditions);

    validations.forEach((val: IEvaluation) => {
      val.resultado = this.validationService.makeValidation(this.dataFile, val);
    });

    console.log('resultados > ', validations);
    setTimeout(() => {
      this.processingHtml = `<img src="/assets/img/success_check.jpg" alt="success_check.jpg" style="width:150px;"/><br>
      <p class="lead">¡El procesamiento de datos ha finalizado exitosamente!</p>`
      this.renderDiagnostic(validations);
    }, 3000);
  }

  public renderDiagnostic(validations: IEvaluation[]) {
    this.diagnosticHtml = '<table class="table table-striped">';
    validations.forEach((val, idx) => {
      this.diagnosticHtml += `<tr><td>${idx+1}</td><td>${this.validationService.renderValidation(val)}</td></tr>`
    });
    this.diagnosticHtml += '</table>';
  }
}
