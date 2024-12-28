import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlevelComponent } from './postlevel.component';

describe('PostlevelComponent', () => {
  let component: PostlevelComponent;
  let fixture: ComponentFixture<PostlevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostlevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
