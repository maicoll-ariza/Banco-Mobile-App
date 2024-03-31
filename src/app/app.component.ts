import { Component } from '@angular/core';
import { ViewState } from './models/view-state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ViewState = ViewState;
  // Propiedad para indicar si el panel está expandido o no
  isExpanded = false;
  // Propiedad almacenar el valor del monto para el crédito
  amount: number = 100000000;
  // Propiedad para almacenar el valor del plazo en meses para el crédito
  term: number = 12;
  rate: number = 1.18; // Tasa de interés mensual en porcentaje

  // Propiedad para almacenar el estado actual de la vista
  currentState: ViewState = ViewState.CreditSelection;

  // Arrelgo para almacenar los valores de las clases para las animaciones
  classes: string[] = [''];

  // Propiedad para almacenar los valores del formulario de información básica
  idenficationNumber: number | null = null;
  firstLastName: string | null = '';
  cellphone: number | null = null;
  conditions: boolean = false;

  /**
   * Calcula la cuota mensual de un préstamo.
   * @returns La cuota mensual del préstamo.
   */
  calculateMonthlyPayment(): number {
    const monthlyInterestRate = this.rate / 100; // Convertir la tasa de interés a una fracción decimal.
    const monthlyPayment =
      (this.amount *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, this.term))) /
      (Math.pow(1 + monthlyInterestRate, this.term) - 1);
    return Math.round(monthlyPayment); // Redondea al peso más cercano para simplificar.
  }

  /**
   * Maneja el evento click para expandir la opción de crédito hipotecario.
   */
  onClickExpand(event: string): void {
    // Cambiar el valor de la propiedad isExpanded
    this.isExpanded = !this.isExpanded;
    this.currentState = ViewState.CreditSelection;
    this.classes = [];
  }

  /**
   * Maneja el evento click para aceptar la configuración del crédito.
   */
  onClickAcceptCredit(): void {
    this.classes.push('disappear');
    setTimeout(() => {
      this.currentState = ViewState.BasicUserInfo;
    }, 200);
  }

  /**
   * Válida que exista la clase para las animaciones.
   * @param classCss Clase a validar.
   * @returns Verdadero si la clase existe, de lo contrario falso.
   */
  validateClassCss(classCss: string): boolean {
    return this.classes.includes(classCss);
  }

  /**
   * Maneja la validación del formulario de información básica.
   * @returns Verdadero si el formulario es válido, de lo contrario falso.
   */
  isDisabledContinue(): boolean {
    return (
      !this.conditions ||
      !this.idenficationNumber ||
      this.idenficationNumber.toString().length < 7 ||
      !this.firstLastName ||
      !this.cellphone ||
      this.cellphone?.toString()[0] !== '3' ||
      this.cellphone?.toString().length < 10
    );
  }
}
