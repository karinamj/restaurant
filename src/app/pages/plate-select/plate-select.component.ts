import { Menu } from './../../models/menu.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plate } from '../../models/plate.model';
import { MenuService } from '../../services/menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plate-select',
  templateUrl: './plate-select.component.html',
  styleUrls: ['./plate-select.component.scss'],
})
export class PlateSelectComponent implements OnInit {
  MENU_KEY: string = 'MENU';
  plateType = [
    {
      vegan: true,
      name: 'Vegano',
    },
    {
      vegan: false,
      name: 'No vegano',
    },
  ];
  menus: Menu[] = [];
  menusNoVegano: Menu[] = [];
  menusVegano: Menu[] = [];

  constructor(private router: Router, private menuService: MenuService) {}

  ngOnInit(): void{
    this.getMenuVegano();
    this.getMenuNoVegano();

    // let nPlates: number = this.getNumberOfPlates(true);
    // if (nPlates === 2) {
    //   this.plateType.splice(0, 1);
    //   this.menus = this.menusNoVegano;
    // } else {
    //   this.menus = this.menusVegano;
    // }
  }

  /**
   * seleccionar plato
   * @param id
   */
  selectPlate(id: number) {
    this.router.navigate(['/create/menu', id]);
  }

  /**
   * obtener menu vegano
   */
  getMenuVegano() {
    this.menuService.getMenuVegano().subscribe((data) => {
      this.menusVegano = data;
    });
  }

  /**
   * obtener menu no vegano
   */
  getMenuNoVegano() {
    this.menuService.getMenu().subscribe((data) => {
      this.menusNoVegano = data.filter((item: any) => item.vegan === false);
    });
  }

  /**
   * al cambiar el tipo de plato
   * @param vegan
   */
  onChangePlateType(vegan: any) {
    if (vegan !== '-1') {
      vegan = vegan === 'true';
      let nPlates = this.getNumberOfPlates(vegan);
      if (nPlates < 2) {
        if (vegan) {
          this.menus = this.menusVegano;
        } else {
          this.menus = this.menusNoVegano;
        }
      } else {
        this.modal();
      }
    }else{
      this.menus = [];
    }
   
  }

  /**
   * obtener numero de platos guardados en local storage por tipo
   * @param vegan
   * @returns
   */
  getNumberOfPlates(vegan: boolean): number {
    let platesAux: Array<Plate> = [];
    let foodPlates: Array<Plate> = this.getLocalStorage();
    if (foodPlates !== null) {
      platesAux = foodPlates.filter((fp) => fp.vegan === vegan);
    }
    return platesAux !== null ? platesAux.length : 0;
  }

  /**
   * obtener datos de local storage
   * @returns
   */
  getLocalStorage(): Array<Plate> {
    const strFoodPlates = localStorage.getItem(this.MENU_KEY);
    return JSON.parse(strFoodPlates!);
  }

  modal() {
    Swal.fire({
      icon: 'warning',
      text: 'A esta categoria no se puede agregar!',
    });
  }
}
