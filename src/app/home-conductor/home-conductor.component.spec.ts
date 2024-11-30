import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeConductorComponent } from './home-conductor.component';

describe('HomeConductorComponent', () => {
  let component: HomeConductorComponent;
  let fixture: ComponentFixture<HomeConductorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeConductorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
