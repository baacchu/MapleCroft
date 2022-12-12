import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getScoreColour() should return White for -1', () => {
    expect(service.getScoreColour(-1)).toBe('White');
  });

  it('getScoreColour() should return LightGray for Undefined', () => {
    expect(service.getScoreColour(undefined)).toBe('LightGray');
  });

  it('getScoreColour() should return #ce181f for 2.5', () => {
    expect(service.getScoreColour(2.5)).toBe('#ce181f');
  });

  it('getScoreColour() should return #ce181f for 1', () => {
    expect(service.getScoreColour(1)).toBe('#ce181f');
  });

  it('getScoreColour() should return #ce181f for 0.1', () => {
    expect(service.getScoreColour(0.1)).toBe('#ce181f');
  });

  it('getScoreColour() should return #f47721 for 2.6', () => {
    expect(service.getScoreColour(2.6)).toBe('#f47721');
  });

  it('getScoreColour() should return #f47721 for 5', () => {
    expect(service.getScoreColour(5)).toBe('#f47721');
  });

  it('getScoreColour() should return #ffc709 for 5.1', () => {
    expect(service.getScoreColour(5.1)).toBe('#ffc709');
  });

  it('getScoreColour() should return #ffc709 for 7.5', () => {
    expect(service.getScoreColour(7.5)).toBe('#ffc709');
  });

  it('getScoreColour() should return #d6e040 for 7.6', () => {
    expect(service.getScoreColour(7.6)).toBe('#d6e040');
  });

  it('getScoreColour() should return #d6e040 for 9.9', () => {
    expect(service.getScoreColour(9.9)).toBe('#d6e040');
  });

  it('getScoreColour() should return #d6e040 for 10', () => {
    expect(service.getScoreColour(10)).toBe('#d6e040');
  });

  it('getScoreColour() should return LightGray for 10.1', () => {
    expect(service.getScoreColour(10.1)).toBe('LightGray');
  });


});
