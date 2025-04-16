import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GullyGangsComponent } from './gully-gangs.component';

describe('GullyGangsComponent', () => {
  let component: GullyGangsComponent;
  let fixture: ComponentFixture<GullyGangsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GullyGangsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GullyGangsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
