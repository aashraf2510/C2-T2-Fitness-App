import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MainCard } from './../../../../../shared/components/ui/main-card/main-card';
import { Title } from './../../../../../core/components/title/title';
import { Header } from './../../../../../core/components/header/header';
import { MealService } from './../../../../../shared/services/meals/meals';
import { Carousel } from "./../../../../../shared/components/ui/carousel/carousel";
import { Category } from './../../../../../shared/models/meals';

@Component({
  selector: 'app-meals',
  imports: [MainCard, Title, Header, Carousel],
  templateUrl: './meals.html',
  styleUrl: './meals.scss',
})
export class Meals implements OnInit {
  x = [1, 2, 3];
  private mealService = inject(MealService);
  mealCats: WritableSignal<Category[]> = signal([]);

  ngOnInit(): void {
    this.getMealCats();
  }
  getMealCats() {
    this.mealService.getMealsCats().subscribe({
      next: (res) => {
        this.mealCats.set(res.categories)
      },
    });
  }
}
