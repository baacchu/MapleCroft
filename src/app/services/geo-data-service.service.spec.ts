import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { GeoDataServiceService } from './geo-data-service.service';

describe('GeoDataServiceService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: GeoDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [ HttpClientTestingModule ], 
      providers: [ GeoDataServiceService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GeoDataServiceService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCountriesScoreData()', () => {
    let expectedScoreData: any;
    let fullPath : string;
   

    beforeEach(() => {
      service = TestBed.inject(GeoDataServiceService);
      fullPath= service.jsonDataRoot + 'data.json';
      expectedScoreData = {
        "PH": {
          "score": 3.872,
          "selected": true,
          "entitled": true,
          "dataAvailable": true
        },
        "PN": {
          "selected": false,
          "entitled": false,
          "dataAvailable": false
        },
        "PL": {
          "score": 6.3566666666666669,
          "selected": true,
          "entitled": true,
          "dataAvailable": true
        },
      };
    });
    
    it('should return score data', () => {
      service.getCountriesScoreData().subscribe({
        next: scores => expect(scores)
          .withContext('should return expected scores')
          .toEqual(expectedScoreData),
        error: fail
      });
     
    
      const req = httpTestingController.expectOne(fullPath);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedScoreData);

    });

    it('should be OK returning no data', () => {
      service.getCountriesScoreData().subscribe({
        next: data => expect(data)
          .withContext('should have empty object')
          .toEqual({}),
        error: fail
      });
      const req = httpTestingController.expectOne(fullPath);
      req.flush({}); // 
    });

    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      service.getCountriesScoreData().subscribe({
        next: data => fail('expected to fail'),
        error: error => expect(error.message).toContain(msg)
      });
      const req = httpTestingController.expectOne(fullPath);
      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('#getCountriesData()', () => {
    let expectedCountriesDetails: any;
    let fullPath : string;
   

    beforeEach(() => {
      service = TestBed.inject(GeoDataServiceService);
      fullPath= service.jsonDataRoot + 'ne_110m_admin_0_countries.json';
      expectedCountriesDetails = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {
              "scalerank": 1,
              "featurecla": "Admin-0 country",
              "LABELRANK": 3.0,
              "SOVEREIGNT": "Afghanistan",
              "SOV_A3": "AFG",
              "ADM0_DIF": 0.0,
              "LEVEL": 2.0,
              "TYPE": "Sovereign country",
              "ADMIN": "Afghanistan",
              "ADM0_A3": "AFG",
              "GEOU_DIF": 0.0,
              "GEOUNIT": "Afghanistan",
              "GU_A3": "AFG",
              "SU_DIF": 0.0,
              "SUBUNIT": "Afghanistan",
              "SU_A3": "AFG",
              "BRK_DIFF": 0.0,
              "NAME": "Afghanistan",
              "NAME_LONG": "Afghanistan",
              "BRK_A3": "AFG",
              "BRK_NAME": "Afghanistan",
              "BRK_GROUP": null,
              "ABBREV": "Afg.",
              "POSTAL": "AF",
              "FORMAL_EN": "Islamic State of Afghanistan",
              "FORMAL_FR": null,
              "NAME_CIAWF": "Afghanistan",
              "NOTE_ADM0": null,
              "NOTE_BRK": null,
              "NAME_SORT": "Afghanistan",
              "NAME_ALT": null,
              "MAPCOLOR7": 5.0,
              "MAPCOLOR8": 6.0,
              "MAPCOLOR9": 8.0,
              "MAPCOLOR13": 7.0,
              "POP_EST": 34124811.0,
              "POP_RANK": 15.0,
              "GDP_MD_EST": 64080.0,
              "POP_YEAR": 2017.0,
              "LASTCENSUS": 1979.0,
              "GDP_YEAR": 2016.0,
              "ECONOMY": "7. Least developed region",
              "INCOME_GRP": "5. Low income",
              "WIKIPEDIA": -99.0,
              "FIPS_10_": "AF",
              "ISO_A2": "AF",
              "ISO_A3": "AFG",
              "ISO_A3_EH": "AFG",
              "ISO_N3": "004",
              "UN_A3": "004",
              "WB_A2": "AF",
              "WB_A3": "AFG",
              "WOE_ID": 23424739.0,
              "WOE_ID_EH": 23424739.0,
              "WOE_NOTE": "Exact WOE match as country",
              "ADM0_A3_IS": "AFG",
              "ADM0_A3_US": "AFG",
              "ADM0_A3_UN": -99.0,
              "ADM0_A3_WB": -99.0,
              "CONTINENT": "Asia",
              "REGION_UN": "Asia",
              "SUBREGION": "Southern Asia",
              "REGION_WB": "South Asia",
              "NAME_LEN": 11.0,
              "LONG_LEN": 11.0,
              "ABBREV_LEN": 4.0,
              "TINY": -99.0,
              "HOMEPART": 1.0,
              "MIN_ZOOM": 0.0,
              "MIN_LABEL": 3.0,
              "MAX_LABEL": 7.0
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    61.210817091725747,
                    35.650072333309228
                  ],
                  [
                    62.230651483005889,
                    35.270663967422297
                  ],
                  [
                    62.98466230657661,
                    35.40404083916762
                  ],
                  [
                    63.19353844590035,
                    35.857165635718917
                  ],
                  [
                    63.98289594915871,
                    36.0079574651466
                  ],
                  [
                    64.5464791197339,
                    36.31207326918427
                  ],
                  [
                    64.7461051776774,
                    37.111817735333307
                  ],
                  [
                    65.58894778835784,
                    37.30521678318564
                  ],
                  [
                    65.74563073106683,
                    37.66116404881207
                  ],
                  [
                    66.21738488145934,
                    37.39379018813392
                  ],
                  [
                    66.51860680528867,
                    37.36278432875879
                  ],
                  [
                    67.07578209825962,
                    37.35614390720929
                  ],
                  [
                    67.82999962755952,
                    37.144994004864688
                  ],
                  [
                    68.13556237170138,
                    37.02311513930431
                  ],
                  [
                    68.85944583524594,
                    37.344335842430599
                  ],
                  [
                    69.19627282092438,
                    37.15114350030743
                  ],
                  [
                    69.51878543485796,
                    37.60899669041342
                  ],
                  [
                    70.11657840361034,
                    37.58822276463209
                  ],
                  [
                    70.27057417184014,
                    37.735164699854028
                  ],
                  [
                    70.3763041523093,
                    38.13839590102752
                  ],
                  [
                    70.80682050973289,
                    38.486281643216418
                  ],
                  [
                    71.34813113799027,
                    38.25890534113216
                  ],
                  [
                    71.23940392444817,
                    37.953265082341889
                  ],
                  [
                    71.54191775908478,
                    37.905774441065648
                  ],
                  [
                    71.44869347523025,
                    37.06564484308052
                  ],
                  [
                    71.8446382994506,
                    36.73817129164692
                  ],
                  [
                    72.1930408059624,
                    36.948287665345677
                  ],
                  [
                    72.63688968291729,
                    37.047558091778359
                  ],
                  [
                    73.26005577992501,
                    37.495256862939
                  ],
                  [
                    73.9486959166465,
                    37.4215662704908
                  ],
                  [
                    74.98000247589542,
                    37.419990139305898
                  ],
                  [
                    75.15802778514092,
                    37.13303091078912
                  ],
                  [
                    74.57589277537298,
                    37.02084137628346
                  ],
                  [
                    74.06755171091783,
                    36.83617564548845
                  ],
                  [
                    72.92002485544447,
                    36.72000702569632
                  ],
                  [
                    71.84629194528393,
                    36.50994232842986
                  ],
                  [
                    71.26234826038575,
                    36.074387518857808
                  ],
                  [
                    71.49876793812109,
                    35.650563259416
                  ],
                  [
                    71.61307620635071,
                    35.153203436822867
                  ],
                  [
                    71.11501875192164,
                    34.733125718722238
                  ],
                  [
                    71.15677330921347,
                    34.34891144463215
                  ],
                  [
                    70.8818030129884,
                    33.98885590263852
                  ],
                  [
                    69.9305432473596,
                    34.02012014417511
                  ],
                  [
                    70.3235941913716,
                    33.35853261975839
                  ],
                  [
                    69.68714725126486,
                    33.105498969041239
                  ],
                  [
                    69.26252200712256,
                    32.5019440780883
                  ],
                  [
                    69.31776411324256,
                    31.901412258424445
                  ],
                  [
                    68.92667687365767,
                    31.620189113892068
                  ],
                  [
                    68.55693200060932,
                    31.713310044882019
                  ],
                  [
                    67.79268924344479,
                    31.58293040620963
                  ],
                  [
                    67.68339358914747,
                    31.30315420178142
                  ],
                  [
                    66.93889122911847,
                    31.304911200479354
                  ],
                  [
                    66.38145755398603,
                    30.738899237586453
                  ],
                  [
                    66.34647260932442,
                    29.887943427036178
                  ],
                  [
                    65.0468620136161,
                    29.472180691031907
                  ],
                  [
                    64.35041873561852,
                    29.560030625928094
                  ],
                  [
                    64.14800215033125,
                    29.340819200145974
                  ],
                  [
                    63.55026085801117,
                    29.468330796826167
                  ],
                  [
                    62.54985680527278,
                    29.31857249604431
                  ],
                  [
                    60.87424848820879,
                    29.829238999952609
                  ],
                  [
                    61.781221551363447,
                    30.735850328081239
                  ],
                  [
                    61.69931440618083,
                    31.379506130492673
                  ],
                  [
                    60.94194461451113,
                    31.548074652628754
                  ],
                  [
                    60.863654819588969,
                    32.18291962333443
                  ],
                  [
                    60.536077915290778,
                    32.98126882581157
                  ],
                  [
                    60.963700392506009,
                    33.52883230237626
                  ],
                  [
                    60.52842980331158,
                    33.676446031218009
                  ],
                  [
                    60.80319339380745,
                    34.40410187431986
                  ],
                  [
                    61.210817091725747,
                    35.650072333309228
                  ]
                ]
              ]
            }
          },
          {
            "type": "Feature",
            "properties": {
              "scalerank": 1,
              "featurecla": "Admin-0 country",
              "LABELRANK": 3.0,
              "SOVEREIGNT": "Angola",
              "SOV_A3": "AGO",
              "ADM0_DIF": 0.0,
              "LEVEL": 2.0,
              "TYPE": "Sovereign country",
              "ADMIN": "Angola",
              "ADM0_A3": "AGO",
              "GEOU_DIF": 0.0,
              "GEOUNIT": "Angola",
              "GU_A3": "AGO",
              "SU_DIF": 0.0,
              "SUBUNIT": "Angola",
              "SU_A3": "AGO",
              "BRK_DIFF": 0.0,
              "NAME": "Angola",
              "NAME_LONG": "Angola",
              "BRK_A3": "AGO",
              "BRK_NAME": "Angola",
              "BRK_GROUP": null,
              "ABBREV": "Ang.",
              "POSTAL": "AO",
              "FORMAL_EN": "People's Republic of Angola",
              "FORMAL_FR": null,
              "NAME_CIAWF": "Angola",
              "NOTE_ADM0": null,
              "NOTE_BRK": null,
              "NAME_SORT": "Angola",
              "NAME_ALT": null,
              "MAPCOLOR7": 3.0,
              "MAPCOLOR8": 2.0,
              "MAPCOLOR9": 6.0,
              "MAPCOLOR13": 1.0,
              "POP_EST": 29310273.0,
              "POP_RANK": 15.0,
              "GDP_MD_EST": 189000.0,
              "POP_YEAR": 2017.0,
              "LASTCENSUS": 1970.0,
              "GDP_YEAR": 2016.0,
              "ECONOMY": "7. Least developed region",
              "INCOME_GRP": "3. Upper middle income",
              "WIKIPEDIA": -99.0,
              "FIPS_10_": "AO",
              "ISO_A2": "AO",
              "ISO_A3": "AGO",
              "ISO_A3_EH": "AGO",
              "ISO_N3": "024",
              "UN_A3": "024",
              "WB_A2": "AO",
              "WB_A3": "AGO",
              "WOE_ID": 23424745.0,
              "WOE_ID_EH": 23424745.0,
              "WOE_NOTE": "Exact WOE match as country",
              "ADM0_A3_IS": "AGO",
              "ADM0_A3_US": "AGO",
              "ADM0_A3_UN": -99.0,
              "ADM0_A3_WB": -99.0,
              "CONTINENT": "Africa",
              "REGION_UN": "Africa",
              "SUBREGION": "Middle Africa",
              "REGION_WB": "Sub-Saharan Africa",
              "NAME_LEN": 6.0,
              "LONG_LEN": 6.0,
              "ABBREV_LEN": 4.0,
              "TINY": -99.0,
              "HOMEPART": 1.0,
              "MIN_ZOOM": 0.0,
              "MIN_LABEL": 3.0,
              "MAX_LABEL": 7.0
            },
            "geometry": {
              "type": "MultiPolygon",
              "coordinates": [
                [
                  [
                    [
                      23.904153680118186,
                      -11.722281589406322
                    ],
                    [
                      24.079905226342846,
                      -12.191296888887365
                    ],
                    [
                      23.930922072045378,
                      -12.565847670138857
                    ],
                    [
                      24.016136508894676,
                      -12.911046237848538
                    ],
                    [
                      21.933886346125918,
                      -12.898437188369359
                    ],
                    [
                      21.887842644953876,
                      -16.08031015387688
                    ],
                    [
                      22.56247846852426,
                      -16.898451429921815
                    ],
                    [
                      23.215048455506066,
                      -17.523116143465985
                    ],
                    [
                      21.37717614104554,
                      -17.930636488519697
                    ],
                    [
                      18.956186964603604,
                      -17.789094740472259
                    ],
                    [
                      18.263309360434165,
                      -17.309950860262008
                    ],
                    [
                      14.209706658595025,
                      -17.35310068122572
                    ],
                    [
                      14.05850141770901,
                      -17.423380629142664
                    ],
                    [
                      13.462362094789967,
                      -16.971211846588774
                    ],
                    [
                      12.814081251688407,
                      -16.94134286872407
                    ],
                    [
                      12.215461460019356,
                      -17.111668389558049
                    ],
                    [
                      11.734198846085093,
                      -17.301889336824489
                    ],
                    [
                      11.64009606288164,
                      -16.67314218512928
                    ],
                    [
                      11.778537224991539,
                      -15.793816013250762
                    ],
                    [
                      12.12358076340439,
                      -14.878316338767903
                    ],
                    [
                      12.175618930722323,
                      -14.449143568583864
                    ],
                    [
                      12.50009524908296,
                      -13.547699883684473
                    ],
                    [
                      12.738478631245386,
                      -13.137905775609923
                    ],
                    [
                      13.312913852601895,
                      -12.483630466362499
                    ],
                    [
                      13.633721144269856,
                      -12.038644707897177
                    ],
                    [
                      13.738727654686898,
                      -11.297863050993115
                    ],
                    [
                      13.68637942877524,
                      -10.731075941615913
                    ],
                    [
                      13.387327915102219,
                      -10.373578383020714
                    ],
                    [
                      13.12098758306982,
                      -9.766897067914102
                    ],
                    [
                      12.875369500386597,
                      -9.166933689005476
                    ],
                    [
                      12.929061313537858,
                      -8.95909107832756
                    ],
                    [
                      13.23643273280993,
                      -8.562629489784328
                    ],
                    [
                      12.93304039882429,
                      -7.596538588087739
                    ],
                    [
                      12.728298374083949,
                      -6.927122084178791
                    ],
                    [
                      12.2273470394465,
                      -6.294447523629358
                    ],
                    [
                      12.32243167486351,
                      -6.10009246177966
                    ],
                    [
                      12.735171339578699,
                      -5.965682061388499
                    ],
                    [
                      13.024869419006962,
                      -5.984388929878158
                    ],
                    [
                      13.375597364971896,
                      -5.864241224799549
                    ],
                    [
                      16.326528354567047,
                      -5.877470391466268
                    ],
                    [
                      16.573179965896146,
                      -6.622644545115087
                    ],
                    [
                      16.8601908708452,
                      -7.222297865429987
                    ],
                    [
                      17.08999596524717,
                      -7.545688978712526
                    ],
                    [
                      17.472970004962236,
                      -8.068551120641644
                    ],
                    [
                      18.13422163256905,
                      -7.987677504104923
                    ],
                    [
                      18.464175652752688,
                      -7.847014255406443
                    ],
                    [
                      19.01675174324967,
                      -7.988245944860132
                    ],
                    [
                      19.16661339689611,
                      -7.738183688999754
                    ],
                    [
                      19.41750247567316,
                      -7.155428562044299
                    ],
                    [
                      20.037723016040219,
                      -7.116361179231646
                    ],
                    [
                      20.091621534920649,
                      -6.943090101756994
                    ],
                    [
                      20.60182295093827,
                      -6.939317722199675
                    ],
                    [
                      20.5147481625265,
                      -7.299605808138629
                    ],
                    [
                      21.7281107927397,
                      -7.290872491081302
                    ],
                    [
                      21.74645592620331,
                      -7.920084730667099
                    ],
                    [
                      21.949130893652045,
                      -8.305900974158277
                    ],
                    [
                      21.8018013851879,
                      -8.90870655684298
                    ],
                    [
                      21.875181919042349,
                      -9.523707777548538
                    ],
                    [
                      22.208753289486397,
                      -9.894796237836509
                    ],
                    [
                      22.155268182064306,
                      -11.08480112065375
                    ],
                    [
                      22.402798292742376,
                      -10.993075453335692
                    ],
                    [
                      22.83734541188474,
                      -11.01762175867431
                    ],
                    [
                      23.45679080576744,
                      -10.867863457892483
                    ],
                    [
                      23.912215203555719,
                      -10.926826267137514
                    ],
                    [
                      24.01789350759259,
                      -11.237298272347104
                    ],
                    [
                      23.904153680118186,
                      -11.722281589406322
                    ]
                  ]
                ],
                [
                  [
                    [
                      12.182336866920253,
                      -5.789930515163839
                    ],
                    [
                      11.91496300624209,
                      -5.037986748884791
                    ],
                    [
                      12.318607618873927,
                      -4.606230157086188
                    ],
                    [
                      12.620759718484493,
                      -4.438023369976136
                    ],
                    [
                      12.995517205465177,
                      -4.781103203961884
                    ],
                    [
                      12.631611769265789,
                      -4.991271254092908
                    ],
                    [
                      12.468004184629706,
                      -5.248361504744977
                    ],
                    [
                      12.436688266660868,
                      -5.684303887559246
                    ],
                    [
                      12.182336866920253,
                      -5.789930515163839
                    ]
                  ]
                ]
              ]
            }
          }
        ]
      };
    });
    
    it('should return countries details ', () => {
      service.getCountriesData().subscribe({
        next: scores => expect(scores)
          .withContext('should return expected countries details')
          .toEqual(expectedCountriesDetails),
        error: fail
      });
     
    
      const req = httpTestingController.expectOne(fullPath);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedCountriesDetails);

    });

    it('should be OK returning no data for getCountriesData()', () => {
      service.getCountriesData().subscribe({
        next: data => expect(data)
          .withContext('should have empty object')
          .toEqual({}),
        error: fail
      });
      const req = httpTestingController.expectOne(fullPath);
      req.flush({}); // 
    });

    it('should turn 404 into a user-friendly error for getCountriesData()', () => {
      const msg = 'Deliberate 404';
      service.getCountriesData().subscribe({
        next: data => fail('expected to fail'),
        error: error => expect(error.message).toContain(msg)
      });
      const req = httpTestingController.expectOne(fullPath);
      // respond with a 404 and the error message in the body
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });


});
