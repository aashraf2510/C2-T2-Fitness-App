import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FitnessFormRadio } from '@fitness-app/fitness-form';

@Component({
  selector: "app-level-modal",
  standalone: true,
  imports: [CommonModule, ButtonModule, FitnessFormRadio],
  templateUrl: "./level-modal.html",
  styleUrl: "./level-modal.scss",
})
export class LevelModal implements OnInit {
  private dialogRef = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);

  selectedActivityLevel: string = 'level1';
  
  activityLevelOptions = [
    { value: 'level1', label: 'Rookie' },
    { value: 'level2', label: 'Beginner' },
    { value: 'level3', label: 'Intermediate' },
    { value: 'level4', label: 'Advanced' },
    { value: 'level5', label: 'True Beast' }
  ];

  ngOnInit(): void {
    console.log('Level modal data received:', this.dialogConfig.data);
    
    const currentLevel = this.dialogConfig.data?.currentActivityLevel;
    
    if (currentLevel) {
      console.log('Setting modal level to:', currentLevel);
      this.selectedActivityLevel = currentLevel;
    } else {
      console.log('No current level provided, using default:', this.selectedActivityLevel);
    }
  }

  onLevelChange(level: string): void {
    console.log('Level selected in modal:', level);
    this.selectedActivityLevel = level;
  }

  onNext(): void {
    console.log('Closing modal with level:', this.selectedActivityLevel);
    this.dialogRef.close(this.selectedActivityLevel);
  }

   close(): void {
    this.dialogRef.close(false); 
  }
}
