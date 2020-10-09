import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service';
import {of} from 'rxjs/internal/observable/of';
import {Hero} from '../hero';
import {HeroComponent} from '../hero/hero.component';
import {By} from '@angular/platform-browser';

describe('HeroesComponent - DEEP test', () => {

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
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        {provide: HeroService, useValue: MockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('Should set heroes correctly from the serviceXX', () => {
    MockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });
});
