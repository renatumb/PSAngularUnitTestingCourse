import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';

describe('HeroesComponent - Shallow test', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let MockHeroService;

  let HEROES = [
    {id: 1, name: 'SpiderDude1', strength: 1},
    {id: 2, name: 'SpiderDude2', strength: 5},
    {id: 3, name: 'SpiderDude3', strength: 10},
  ];

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    MockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    HEROES = [
      {id: 1, name: 'SpiderDude1', strength: 1},
      {id: 2, name: 'SpiderDude2', strength: 5},
      {id: 3, name: 'SpiderDude3', strength: 10},
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        {provide: HeroService, useValue: MockHeroService}
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('Should set heroes correctly from the service', () => {

    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

});
