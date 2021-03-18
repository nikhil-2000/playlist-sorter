import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSortComponent } from './playlist-sort.component';

describe('PlaylistSortComponent', () => {
  let component: PlaylistSortComponent;
  let fixture: ComponentFixture<PlaylistSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
