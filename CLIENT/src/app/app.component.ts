import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { idToken } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/states/auth.state';
import * as AuthActions from '../actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  items = [{ title: 'Tạo Ghim ý tưởng' }, { title: 'Tạo Ghim' }];
  recentSearchs = ['Cat', 'Dog', 'Su Tu Ha Dong'];
  title = 'CLIENT';

  suggestBox: any;
  input: any;

  idToken$ = this.store.select((state) => state.auth.idToken);

  constructor(
    private store: Store<{ auth: AuthState }>,
    private element: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.suggestBox = this.element.nativeElement.querySelector(
      '.suggestionContainer'
    );

    this.input = this.element.nativeElement.querySelector('#searchInput');
  }

  login() {
    this.store.dispatch(AuthActions.login());
  }
<<<<<<< HEAD

  onFocus() {
    this.suggestBox.classList.add('make-visible');
  }

  onFocusout() {
    if (
      this.input === document.activeElement ||
      this.suggestBox.matches(':hover')
    )
      return;
    this.suggestBox.classList.remove('make-visible');
  }
=======
>>>>>>> 0ae5825d892f21fda25305cb3fd48d3516865d46
}
