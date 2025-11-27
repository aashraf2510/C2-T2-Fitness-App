import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FitnessFormRadio } from '@fitness-app/fitness-form';

@Component({
  selector: 'app-goal-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, FitnessFormRadio],
  templateUrl: "./goal-modal.html",
  styleUrl: "./goal-modal.scss",
})
export class GoalModalComponent implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);

  selectedGoal: string = 'lose_weight';
  
  goalOptions = [
    { value: 'gain_weight', label: 'Gain Weight' },
    { value: 'lose_weight', label: 'Lose Weight' },
    { value: 'get_fitter', label: 'Get Fitter' },
    { value: 'gain_more_flexible', label: 'Gain More Flexible' },
    { value: 'learn_the_basic', label: 'Learn The Basic' }
  ];

  ngOnInit(): void {
    // Use the current goal from user data
    if (this.dialogConfig.data?.currentGoal) {
      this.selectedGoal = this.dialogConfig.data.currentGoal;
    }
    console.log('Modal initialized with goal:', this.selectedGoal);
  }

  onGoalChange(goal: string): void {
    this.selectedGoal = goal;
  }

  onNext(): void {
    this.dialogRef.close(this.selectedGoal);
  }
  close(): void {
    this.dialogRef.close(false); 
  }
}