import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';

describe('HeroesComponent - Shallow test', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let MockHeroService;

  let HEROES = [
    {id: 1, name: 'SpiderDude1', strength: 1},
    {id: 2, name: 'SpiderDude2', strength: 5},
    {id: 3, name: 'SpiderDude3', strength: 10},
  ];

  beforeEach(() => {
    MockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    HEROES = [
      {id: 1, name: 'SpiderDude1', strength: 1},
      {id: 2, name: 'SpiderDude2', strength: 5},
      {id: 3, name: 'SpiderDude3', strength: 10},
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: HeroService, useValue: MockHeroService}
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    console.log('beforeEach');
  });

  it('Should set heroes correctly from the service', () => {

    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

});
