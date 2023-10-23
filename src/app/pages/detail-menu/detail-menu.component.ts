import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { Plate } from '../../models/plate.model';
import { Menu } from '../../models/menu.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-detail-menu',
  templateUrl: './detail-menu.component.html',
  styleUrls: ['./detail-menu.component.scss'],
})
export class DetailMenuComponent implements OnInit {
  MENU_KEY = 'MENU';
  ingredients: Ingredient[] = [];
  menu: Plate = new Plate();

  constructor(private router: Router, private route: ActivatedRoute, private menuService: MenuService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.menu = this.getPlateInformation(parseInt(id!));
    this.ingredients = this.getIngredientsByPlate(parseInt(id!));
  }

  getPlateInformation(id: number): Plate{
    const strFoodPlates = this.getLocalStorage();
    let plate = strFoodPlates.find((f) => f.id === id);
    return plate!;
  }

  getIngredientsByPlate(id: number): Array<Ingredient> {
    const strFoodPlates = this.getLocalStorage();
    let plate = strFoodPlates.find(f => f.id === id);
    return plate!.ingredients;
  }

  getLocalStorage(): Array<Plate> {
    const strFoodPlates = localStorage.getItem(this.MENU_KEY);
    return JSON.parse(strFoodPlates!);
  }
}
