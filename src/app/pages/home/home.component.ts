import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../models/menu.model';
import { Ingredient } from '../../models/ingredient.model';
import { Plate } from '../../models/plate.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public menuVegano: Array<any> = [];
  public menu: Plate[] = [];
  public plate: Plate[] = [];
  foodPlates: Plate[] = [];
  MENU_KEY = 'MENU';
  dato: any;
  total: number = 0;

  constructor(private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    /*this.getMenuVegano();
    this.getMenu();*/
    this.listMenu();
    this.getTotal();
  }

  /**
   * listar platos creados
   */
  listMenu() {
    this.menu = this.getLocalStorage();
  }

  /**
   * ver detalle
   * @param id 
   */
  seeDetail(id: number) {
    this.router.navigate(['/detail/menu', id]);
  }

  /**
   * obtener total $ del menu
   */
  getTotal() {
    const foodPlates: Array<Plate> = this.getLocalStorage();
    this.total = foodPlates
      .map((item) => item.pricePerServing)
      .reduce((prev, next) => prev + next, 0);
  }

  /**
   * eliminar plato
   * @param id 
   */
  delete(id: number) {
    Swal.fire({
      title: 'Estas seguro de eliminar este plato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si!',
    }).then((result) => {
      if (result.isConfirmed) {
        let plates: Array<Plate> = this.getLocalStorage();
        let index = plates.findIndex((item) => item.id === id);
        plates.splice(index, 1);

        //actualizar datos de local storage
        this.updateLocalStorage(plates);

        //obtener datos actualizados
        this.menu = this.getLocalStorage();

        //actualizar totales
        this.getTotal();

        Swal.fire('Plato eliminado', 'success');
      }
    });
  }

  /**
   * actualizar datos en local storage
   * @param plate
   */
  updateLocalStorage(foodPlates: Array<Plate>) {
    localStorage.setItem(this.MENU_KEY, JSON.stringify(foodPlates));
  }

  
  /**
   * obtener datos de local storage
   * @returns
   */
   getLocalStorage(): Array<Plate> {
    const strFoodPlates = localStorage.getItem(this.MENU_KEY);
    return JSON.parse(strFoodPlates!);
  }

}
