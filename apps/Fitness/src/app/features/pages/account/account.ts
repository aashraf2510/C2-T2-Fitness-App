import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '@fitness-app/services';
import { DialogService } from 'primeng/dynamicdialog';
import { UserService } from './services/user-service/user-service';
import { GoalModalComponent } from './components/goal-modal/goal-modal';
import { Subscription } from 'rxjs';
import { LevelModal } from './components/level-modal/level-modal';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal';
import { MessageService } from 'primeng/api';
import { LogoutConfirmationModalComponent } from './components/logout-confirmation-modal/logout-confirmation-modal';
import { Router } from '@angular/router';
import { WeightModalComponent } from './components/weight-modal/weight-modal';


@Component({
    selector: "app-account",
    standalone: true,
    imports: [CommonModule, ButtonModule],
    templateUrl: "./account.html",
    styleUrl: "./account.scss",
})
export class Account implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private dialogService = inject(DialogService);
  themeService = inject(ThemeService);
  private readonly messageService = inject(MessageService);
  private router = inject(Router);

  private subscriptions = new Subscription();

  user = this.userService.currentUser;

  ngOnInit(): void {
    this.loadUserData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUserData(): void {
    const sub = this.userService.getLoggedUserData().subscribe({
      error: (error) => {
        console.error('Error loading user data:', error);
      }
    });
    this.subscriptions.add(sub);
  }

  onThemeToggle(): void {
    this.themeService.toggle();
  }

  openGoalModal(): void {
    const currentGoal = this.user()?.goal;
    console.log('Opening goal modal with current goal:', currentGoal);
    
    const dialogRef = this.dialogService.open(GoalModalComponent, {
      width: '90vw',
      style: { 
        'max-width': '500px', 
        'border-radius': '16px',
        
      },
      data: {
        currentGoal: currentGoal
      }
    });

    if (dialogRef) {
      const sub = dialogRef.onClose.subscribe((result: string) => {
        if (result) {
          this.updateGoal(result);
        }
      });
      this.subscriptions.add(sub);
    }
  }

  openWeightModal(): void {
  const currentWeight = this.user()?.weight;
  console.log('Opening weight modal with current weight:', currentWeight);
  
  const dialogRef = this.dialogService.open(WeightModalComponent, {
    width: '90vw',
    style: { 
      'max-width': '500px', 
      'border-radius': '16px'
    },
    data: {
      currentWeight: currentWeight
    }
  });

  if (dialogRef) {
    const sub = dialogRef.onClose.subscribe((result: number) => {
      if (result) {
        this.updateWeight(result);
      }
    });
    this.subscriptions.add(sub);
  }
}

private updateWeight(weight: number): void {
  console.log('Updating weight to:', weight);
  
  const sub = this.userService.updateWeight(weight).subscribe({
    next: () => {
      console.log('Weight updated successfully');
    },
    error: (error) => {
      console.error('Error updating weight:', error);
    }
  });
  this.subscriptions.add(sub);
}

  openActivityLevelModal(): void {
    const currentLevel = this.user()?.activityLevel;
    console.log('Opening level modal with current level:', currentLevel);
    
    const dialogRef = this.dialogService.open(LevelModal, {
      width: '90vw',
      style: { 
        'max-width': '500px', 
        'border-radius': '16px',
        
      },
      data: {
        currentActivityLevel: currentLevel
      }
    });

    if (dialogRef) {
      const sub = dialogRef.onClose.subscribe((result: string) => {
        if (result) {
          this.updateActivityLevel(result);
        }
      });
      this.subscriptions.add(sub);
    }
  }


  private updateActivityLevel(activityLevel: string): void {
    console.log(' Updating activity level to:', activityLevel);
    
    const sub = this.userService.updateActivityLevel(activityLevel).subscribe({
      next: () => {
        console.log('Activity level updated successfully');
      },
      error: (error) => {
        console.error('Error updating activity level:', error);
      }
    });
    this.subscriptions.add(sub);
  }

  private updateGoal(goal: string): void {
    const sub = this.userService.updateGoal(goal).subscribe({
      next: () => {
        console.log('Goal updated successfully');
      },
      error: (error) => {
        console.error('Error updating goal:', error);
      }
    });
    this.subscriptions.add(sub);
  }

  getDisplayGoal(goal: string | undefined): string {
    if (!goal) return 'Not Set';
    
    const goalMap: { [key: string]: string } = {
      'gain_weight': 'Gain Weight',
      'lose_weight': 'Lose Weight',
      'get_fitter': 'Get Fitter',
      'gain_more_flexible': 'Gain More Flexible',
      'learn_the_basic': 'Learn The Basic'
    };
    
    return goalMap[goal] || goal;
  }

  getDisplayActivityLevel(level: string | undefined): string {
    if (!level) return 'Not Set';
    
    const levelMap: { [key: string]: string } = {
      'beginner': 'Beginner',
      'intermediate': 'Intermediate',
      'advanced': 'Advanced',
      'true_beast': 'True Beast'
    };
    
    return levelMap[level] || level;
  }

  openChangePasswordModal(): void {
  const dialogRef = this.dialogService.open(ChangePasswordModalComponent, {
    width: '90vw',
    style: { 
      'max-width': '500px', 
      'border-radius': '16px'
    }
  });

  if (dialogRef) {
    const sub = dialogRef.onClose.subscribe((result: { oldPassword: string, newPassword: string }) => {
      if (result) {
        this.changePassword(result.oldPassword, result.newPassword);
      }
    });
    this.subscriptions.add(sub);
  }
}

private changePassword(oldPassword: string, newPassword: string): void {
  console.log('Changing password...');
  
  const sub = this.userService.changePassword(oldPassword, newPassword).subscribe({
    next: (response) => {
      console.log(' Password changed successfully:', response);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Password changed successfully!',
        life: 3000
      });

    },
    error: (error) => {
      console.error('Error changing password:', error);
      
      this.messageService.add({
        severity: 'error',
        summary: 'Error', 
        detail: 'Failed to change password. Please try again.',
        life: 3000
      });
    }
  });
  this.subscriptions.add(sub);
}


openLogoutConfirmation(): void {
  const dialogRef = this.dialogService.open(LogoutConfirmationModalComponent, {
    width: '90vw',
    style: { 
      'max-width': '400px', 
      'border-radius': '16px'
    }
  });

  if (dialogRef) {
    const sub = dialogRef.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.logout();
      }
    });
    this.subscriptions.add(sub);
  }
}

private logout(): void {
  console.log('Logging out...');
  
  const sub = this.userService.logout().subscribe({
    next: () => {
      console.log('Logged out successfully');
      
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Logged out successfully!',
        life: 3000
      });
      
      this.router.navigate(['/']);
      
      // Scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    },
    error: (error) => {
      console.error('Error during logout:', error);
      
      // Even if GET fails, clear local data
      this.userService.currentUser.set(null);
      localStorage.removeItem('token');
    
      if (error.status === 404) {
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Logged out locally',
          life: 3000
        });
      } else {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Logged out successfully!',
          life: 3000
        });
      }
      
      this.router.navigate(['/']);
      
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  });
  this.subscriptions.add(sub);
}
}