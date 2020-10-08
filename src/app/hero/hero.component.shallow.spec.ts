import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroComponent} from './hero.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('Hero Component - Shallow test', () => {

  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('Should have the correct Hero', () => {
    fixture.componentInstance.hero = {id: 10, name: 'pedro', strength: 100};

    expect(fixture.componentInstance.hero).not.toBe(null);
  });

  it('Should render the Hero name in the <a> tag', () => {
    fixture.componentInstance.hero = {id: 10, name: 'pedro bola', strength: 100};
    fixture.detectChanges();

    var htmlElement = fixture.debugElement.query( By.css('a') );

    console.log(htmlElement);

    expect( htmlElement.nativeElement.textContent).toContain('pedro');
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('pedro');
  });
});
