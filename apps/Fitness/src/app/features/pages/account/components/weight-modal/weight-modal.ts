import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FitnessInputSlider } from '@fitness-app/fitness-form'; 

@Component({
  selector: 'app-weight-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, FitnessInputSlider],
  templateUrl: "./weight-modal.html",
  styleUrl: "./weight-modal.scss",
})
export class WeightModalComponent implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);

  currentWeight = signal(70);

   ngOnInit(): void {
    if (this.dialogConfig.data?.currentWeight) {
      this.currentWeight.set(this.dialogConfig.data.currentWeight);
    }
    console.log('Weight modal initialized with weight:', this.currentWeight());
  }

  onWeightChange(weight: number): void {
    this.currentWeight.set(weight);
  }

  onDone(): void {
    this.dialogRef.close(this.currentWeight());
  }
  close(): void {
    this.dialogRef.close(false); 
  }
}