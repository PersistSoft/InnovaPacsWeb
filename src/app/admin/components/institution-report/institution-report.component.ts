import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalityReportDto } from 'src/app/core/model/globalReportDto';
import { InstitutionReportDto } from 'src/app/core/model/institutionReportDto';
import { InstitutionService } from 'src/app/core/service/institution.service';
import { Util } from 'src/app/core/util/util';
//import { multi } from './data';

@Component({
  selector: 'app-institution-report',
  templateUrl: './institution-report.component.html',
  styleUrls: ['./institution-report.component.sass']
})
export class InstitutionReportComponent implements OnInit {
  public modalityReportDto: ModalityReportDto[] = [];
  public institutionReportDto: InstitutionReportDto[] = [];
  public lstModality: any[] = [];
  public modalityData: any = [];
  public institutionData: any = [];

  view: any[] = [600, 250];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Modalidad';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';
  showDataLabel = true;

  colorScheme = {
    domain: ['#0000FF', '#FF0066', '#9900FF', '#AAAAAA']
  };

  constructor(private institutionService: InstitutionService,
    public util: Util,
    private activatedRoute: ActivatedRoute) {
            
  }

  ngOnInit(): void {
    this.load();
  }

  onSelect(event) {
    console.log(event);
  }

  public load() {
    this.activatedRoute.params.subscribe( async params => {
      const institutionId = params.institutionId;
      if (institutionId) {
        this.getModalityData(institutionId);
        this.getInstitutionData(institutionId);
      }
    });
  }

  /**
   * Get data of modalities by institutions
   */
  private getModalityData(institutionId: number){
    this.util.loading();
    this.institutionService.modalityReport(institutionId).subscribe(response => {
      this.configureModalityReport(response as ModalityReportDto[]);
      this.util.cancelLoading();
    }, (error) => this.util.handleError(error));
  }

  /**
  * Get data of modalities by institutions
  */
  private getInstitutionData(institutionId: number){
    this.util.loading();
    this.institutionService.institutionReport(institutionId).subscribe(response => {
      this.configureInstitutionReport(response as InstitutionReportDto[]);
      this.util.cancelLoading();
    }, (error) => this.util.handleError(error));
  }

  /**
   * Generate modality report
   * @param modalityReportDto 
   */
  private configureModalityReport(modalityReportDto: ModalityReportDto[]){
    this.modalityReportDto = modalityReportDto; 
    const modalities: any = [];
    this.modalityReportDto.map( modality => {
      modalities.push(
        {
          "name": modality.modality,
          "series": [
            {
                "name": "Estudios",
                "value": modality.numberStuty
            },
            {
                "name": "Pacientes",
                "value": modality.numberPatients
            },
            {
                "name": "Imágenes",
                "value": modality.numberInstances
            }
          ]
        }
      );
    });
    Object.assign(this, { modalityData : modalities });
  }

  /**
  * Generate intitution report
  * @param modalityReportDto 
  */
  private configureInstitutionReport(modalityReportDto: InstitutionReportDto[]){
    this.institutionReportDto = modalityReportDto; 
    const institutions: any = [];
    this.institutionReportDto.map( institution => {
      institutions.push(
        {
          "name": "Estudios",
          "value": institution.numberStuty
        },
        {
            "name": "Pacientes",
            "value": institution.numberPatients
        },
        {
            "name": "Imágenes",
            "value": institution.numberInstances
        }
      );
      
    })
    Object.assign(this, { institutionData : institutions });
  }
}