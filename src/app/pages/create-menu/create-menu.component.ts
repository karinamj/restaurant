import { MenuService } from './../../services/menu.service';
import { Menu } from './../../models/menu.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Ingredient } from '../../models/ingredient.model';
import { Plate } from '../../models/plate.model';
import { IngredientService } from '../../services/ingredient.service';


@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss'],
})
export class CreateMenuComponent implements OnInit {
  MENU_KEY : string = 'MENU'

  ingredients: Ingredient[] = [];
  ingredientsAdd: Ingredient[] = [];
  plateType: any = [];
  plate: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private ingredientService: IngredientService, private menuService: MenuService ) {}

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get("id");

    this.getPlateInformation(parseInt(id!));
    this.listIngredients(parseInt(id!));
  }
 /*services */

 
  /**
   * seleccionar tipo de plato
   * @param value 
   */
  onChangePlateType(value: string){
    console.log(value);
  }

  getPlateInformation(id: number){
    this.menuService.getPlateInformation(id).subscribe((data)=>{
      this.plate = data;
    })
  }

  listIngredients(id: number){
    this.ingredientService.getIngredientId(id).subscribe((data)=>{
      this.ingredients = data;
      console.log(this.ingredients)
    })
  }

  /**
   * añadir ingrediente
   * @param id 
   * @param name 
   */
  addIngredient(ingredient: Ingredient) {
    let findIngredient = this.ingredientsAdd.find(e => e.name === ingredient.name);
    if (findIngredient === undefined) {       
      this.ingredientsAdd.push(ingredient);
    }else{
      alert('Producto agregado anteriormente.');
    }
  }

  delete(name: string) {
    let index = this.ingredientsAdd.findIndex(ingredient => ingredient.name === name);
    this.ingredientsAdd.splice(index, 1);
  }

  /**
   * crear menu
   */
   createPlateOfFood(){
    Swal.fire({
      title: 'Nombre del Menu',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.validatePlateOfFood(result.value)){
          this.confirmAddPlateOfFood(result.value);
        }
      }
    });
  }

  /**
   * 
   * @param plateName añadir menu
   */
   confirmAddPlateOfFood(plateName: string) {
    Swal.fire({
      title: 'Estas seguro de guardar este menu?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        let plate = new Plate();
        plate.id = this.plate.id;
        plate.name = plateName;
        plate.vegan = this.plate.vegan;
        plate.readyInMinutes = this.plate.readyInMinutes;
        plate.healthScore = this.plate.healthScore;
        plate.image = this.plate.image;
        plate.ingredients = this.ingredientsAdd;
        plate.pricePerServing = this.plate.pricePerServing;
       
        //añadir plato
        this.addLocalStorage(plate);
        this.ingredientsAdd = [];
        Swal.fire('Listo', 'El menu ha sido guardado', 'success');
        this.goHome();
      }
    });
  }

  
  /**
   * validar si el nombre del plato existe.
   * @param name 
   */
   validatePlateOfFood(name: string): boolean{
    let foodPlates: Array<Plate> = this.getLocalStorage();
    if (foodPlates !== null) {
      let plate = foodPlates.find(f => f.name === name);
      if (plate !== undefined) {
        Swal.fire({title: 'Ya existe un plato con el mismo nombre.', icon: 'warning'});
        return false;
      }
    }
    return true;
  }

  /**
   * guardar plato en local storage
   * @param plate 
   */
   addLocalStorage(plate: Plate){
    let foodPlates: Array<Plate> = this.getLocalStorage();
    foodPlates = foodPlates === null ? [] : foodPlates;
    foodPlates.push(plate);
    localStorage.setItem(this.MENU_KEY, JSON.stringify(foodPlates));
  }

  /**
   * obtener datos de local storage
   * @returns 
   */
  getLocalStorage(): Array<Plate>{
    const strFoodPlates = localStorage.getItem(this.MENU_KEY);
    return JSON.parse(strFoodPlates!);
  }

  goHome(){
    this.router.navigate(['home']);
  }
}
