import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { CardsComponent } from './cards/cards.component';

// material modules
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CardsComponent],
  exports: [CardsComponent],
  imports: [CommonModule, MatCardModule, MatDialogModule],
})
export class ComponentsModule {}
