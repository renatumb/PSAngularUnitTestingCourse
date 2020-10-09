import {TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';
import {MessageService} from './message.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


describe('Hero Service', () => {

  let mockMessageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
       {provide: MessageService, useValue: mockMessageService}
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('Should trigger 1 request to getHero', () => {
    const heroService = TestBed.get(HeroService);

    heroService.getHero(3).subscribe({
      next: value => {
        console.log(new Date() + 'NEXT:');
        console.log(value);
      },
      complete: () => {
        console.log(new Date() + 'COMPLETE =)');
      },
      error: err => {
        console.log(new Date() + 'ERROR:');
        console.log(err);
      }
    });
    const request = httpTestingController.expectOne('api/heroes/3');
    request.flush({id: 10, name: 'Super Dude', strength: 200});
    httpTestingController.verify();
  });
});
