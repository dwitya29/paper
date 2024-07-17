import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../services/user.services';
import { User } from '../../types/user.types';
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockUserService: jasmine.SpyObj<UserService>
  let mockActivatedRoute: any

  const data: User = {
    id: 1,
    name: 'Dwitya Bayusagara',
    username: 'Dwit',
    email: 'dwitya.bayusagara@gmail.com',
    address: {
      street: 'Nevada Downtown',
      suite: 'Blok A36',
      city: 'Bandung',
      zipcode: '40552',
      geo: {
        lat: '-6.8727',
        lng: '107.5070'
      }
    },
    phone: '+62 895 0516 5406',
    website: 'dwitya.com',
    company: {
      name: 'Paper.id',
      catchPhrase: 'Paper.id',
      bs: 'Paper.id'
    }
  }

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUserDetail'])
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [
        UserDetailComponent
      ],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    mockUserService.getUserDetail.and.returnValue(of(data))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data successfully', () => {
    fixture.detectChanges()
    expect(component.user).toEqual(data)
  });

  it('should show correct data', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement;
    const nameField = compiled.querySelector('div[data-test-id=user-name]')
    expect(nameField).toBeTruthy()
    expect(nameField?.textContent).toContain(data.name)
  });
});
