import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistSorterPageComponent } from './playlist-sorter-page.component';

describe('PlaylistSorterPageComponent', () => {
  let component: PlaylistSorterPageComponent;
  let fixture: ComponentFixture<PlaylistSorterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistSorterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistSorterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
