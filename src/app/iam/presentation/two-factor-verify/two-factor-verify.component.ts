import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../../shared/language/language.service';
import { AuthService } from '../../infrastructure/services/auth.service';

@Component({
  selector: 'app-two-factor-verify',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './two-factor-verify.component.html',
  styleUrls: ['./two-factor-verify.component.scss'],
})
export class TwoFactorVerifyComponent {
  code = '';
  message = '';
  email = '';

  constructor(
    public language: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  verifyCode(): void {
    if (!/^\d{6}$/.test(this.code)) {
      this.message = 'Please enter a valid 6-digit code.';
      return;
    }

    if (!this.authService.hasPendingTwoFactorChallenge()) {
      this.message = 'Your verification session has expired. Please login again.';
      return;
    }

    this.authService.verify2FA(this.code).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.message = 'Invalid or expired verification code.';
        }
      },
      error: () => {
        this.message = 'Error verifying code. Please try again.';
      },
    });
  }
}
