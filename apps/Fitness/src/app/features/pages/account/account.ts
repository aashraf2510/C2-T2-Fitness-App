import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '@fitness-app/services';


@Component({
    selector: "app-account",
    imports: [CommonModule, ButtonModule],
    templateUrl: "./account.html",
    styleUrl: "./account.scss",
})
export class Account {
  //    settingCards: SettingCard[] = [
  //   {
  //     title: 'Your Goal',
  //     subtitle: 'TAP TO CHANGE',
  //     value: 'Lose Weight',
  //     icon: 'pi-sync'
  //   },
  //   {
  //     title: 'Level',
  //     subtitle: 'TAP TO CHANGE',
  //     value: 'Beginner',
  //     icon: 'pi-sync'
  //   },
  //   {
  //     title: 'Weight',
  //     subtitle: 'TAP TO CHANGE',
  //     value: '90 kg',
  //     icon: 'pi-sync'
  //   }
  // ];

  // optionCards: OptionCard[] = [
  //   { icon: 'pi-lock', label: 'Change Password' },
  //   { icon: 'pi-globe', label: 'Select Language', tag: '(English)' },
  //   { icon: 'pi-moon', label: 'Mood', tag: '(Dark)' },
  //   { icon: 'pi-shield', label: 'Security' },
  //   { icon: 'pi-file', label: 'Privacy Policy' },
  //   { icon: 'pi-question-circle', label: 'Help' }
  // ];

   themeService = inject(ThemeService);

  onThemeToggle() {
    this.themeService.toggle();
  }
}
