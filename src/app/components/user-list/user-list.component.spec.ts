import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from '../../services/user.services';
import { User } from '../../types/user.types';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserService: jasmine.SpyObj<UserService>

  const data: User[] = [
    {
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
  ]

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUserList'])

    await TestBed.configureTestingModule({
      imports: [
        UserListComponent
      ],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    mockUserService.getUserList.and.returnValue(of(data))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users data successfully', () => {
    fixture.detectChanges()
    expect(component.users.length).toEqual(data.length)
  });

  it('should show correct data', () => {
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement;
    const firstRow = compiled.querySelector('tbody[data-test-id=user-table] tr:first-child')
    expect(firstRow).toBeTruthy()

    const nameField = firstRow?.querySelector('td div[data-test-id=user-name]')
    expect(nameField?.textContent).toContain(data[0].name)
  });
});
