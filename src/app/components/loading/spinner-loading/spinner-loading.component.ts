import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-spinner-loading',
  templateUrl: './spinner-loading.component.html',
  styleUrls: ['./spinner-loading.component.scss']
})
export class SpinnerLoadingComponent implements OnInit {

  @Input()
  public logo: boolean = true;
  @Input()
  public mode: "determinate" | "indeterminate" = "indeterminate";
  @Input()
  public color: "primary" | "accent" | "warn" = "primary";
  @Input()
  public show: boolean = false;
  @Input()
  public spinner: boolean = false;

  public splash: string;

  private getSplash() {
    let splashs: string[] = [
      "Chargement en cours",
      "Deux secondes de plus",
      "En chargement depuis 2012",
      "Computation des anti-retours",
      "Remise à niveau de la vapeur",
      "Pompage du carburant",
      "Elongation du prototype de base",
      "Et sinon, vous ça va ?",
      "Codé avec les pieds",
      "Modélisation de l'holographie interne",
    ];

    this.splash = splashs[Math.floor(Math.random() * splashs.length)];
  }

  constructor() { }

  ngOnInit() {
    this.getSplash();
  }

}
