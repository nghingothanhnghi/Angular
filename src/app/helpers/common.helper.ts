export class Common {
    static httpMethods = [
      { value: 'get', text: 'GET', action: 'get', parameterTypes: [0, 1, 3] },
      { value: 'post', text: 'POST', action: 'send', parameterTypes: [1, 2] },
      { value: 'put', text: 'PUT', action: 'send', parameterTypes: [1, 2, 3] },
      { value: 'delete', text: 'DELETE', action: 'send', parameterTypes: [1] }
    ];
  
    static httpParameterTypes = [
      { value: '', text: 'none' },
      { value: 'path', text: 'Path' },
      { value: 'body', text: 'Body' },
      { value: 'query', text: 'Query' }
    ];
  
    static timeZones = [
      { value: 'Pacific/Niue', text: '(UTC-11:00) Niue' },
      { value: 'Pacific/Pago_Pago', text: '(UTC-11:00) Pago Pago' },
      { value: 'Pacific/Honolulu', text: '(UTC-10:00) Hawaii Time' },
      { value: 'Pacific/Rarotonga', text: '(UTC-10:00) Rarotonga' },
      { value: 'Pacific/Tahiti', text: '(UTC-10:00) Tahiti' },
      { value: 'Pacific/Marquesas', text: '(UTC-09:30) Marquesas' },
      //        { value: 'America/Anchorage', text: '(UTC-09:00) Alaska Time' },
      { value: 'Pacific/Gambier', text: '(UTC-09:00) Gambier' },
      //        { value: 'America/Los_Angeles', text: '(UTC-08:00) Pacific Time' },
      //        { value: 'America/Tijuana', text: '(UTC-08:00) Pacific Time - Tijuana' },
      //        { value: 'America/Vancouver', text: '(UTC-08:00) Pacific Time - Vancouver' },
      //        { value: 'America/Whitehorse', text: '(UTC-08:00) Pacific Time - Whitehorse' },
      { value: 'Pacific/Pitcairn', text: '(UTC-08:00) Pitcairn' },
      //        { value: 'America/Denver', text: '(UTC-07:00) Mountain Time' },
      { value: 'America/Phoenix', text: '(UTC-07:00) Mountain Time - Arizona' },
      //        { value: 'America/Mazatlan', text: '(UTC-07:00) Mountain Time - Chihuahua, Mazatlan' },
      {
        value: 'America/Dawson_Creek',
        text: '(UTC-07:00) Mountain Time - Dawson Creek'
      },
      //        { value: 'America/Edmonton', text: '(UTC-07:00) Mountain Time - Edmonton' },
      {
        value: 'America/Hermosillo',
        text: '(UTC-07:00) Mountain Time - Hermosillo'
      },
      //        { value: 'America/Yellowknife', text: '(UTC-07:00) Mountain Time - Yellowknife' },
      { value: 'America/Belize', text: '(UTC-06:00) Belize' },
      //        { value: 'America/Chicago', text: '(UTC-06:00) Central Time' },
      //        { value: 'America/Mexico_City', text: '(UTC-06:00) Central Time - Mexico City' },
      { value: 'America/Regina', text: '(UTC-06:00) Central Time - Regina' },
      {
        value: 'America/Tegucigalpa',
        text: '(UTC-06:00) Central Time - Tegucigalpa'
      },
      //        { value: 'America/Winnipeg', text: '(UTC-06:00) Central Time - Winnipeg' },
      { value: 'America/Costa_Rica', text: '(UTC-06:00) Costa Rica' },
      { value: 'America/El_Salvador', text: '(UTC-06:00) El Salvador' },
      { value: 'Pacific/Galapagos', text: '(UTC-06:00) Galapagos' },
      { value: 'America/Guatemala', text: '(UTC-06:00) Guatemala' },
      { value: 'America/Managua', text: '(UTC-06:00) Managua' },
      { value: 'America/Cancun', text: '(UTC-05:00) America Cancun' },
      { value: 'America/Bogota', text: '(UTC-05:00) Bogota' },
      { value: 'Pacific/Easter', text: '(UTC-05:00) Easter Island' },
      //        { value: 'America/New_York', text: '(UTC-05:00) Eastern Time' },
      //        { value: 'America/Iqaluit', text: '(UTC-05:00) Eastern Time - Iqaluit' },
      //       { value: 'America/Toronto', text: '(UTC-05:00) Eastern Time - Toronto' },
      { value: 'America/Guayaquil', text: '(UTC-05:00) Guayaquil' },
      //        { value: 'America/Havana', text: '(UTC-05:00) Havana' },
      { value: 'America/Jamaica', text: '(UTC-05:00) Jamaica' },
      { value: 'America/Lima', text: '(UTC-05:00) Lima' },
      //        { value: 'America/Nassau', text: '(UTC-05:00) Nassau' },
      { value: 'America/Panama', text: '(UTC-05:00) Panama' },
      //        { value: 'America/Port-au-Prince', text: '(UTC-05:00) Port-au-Prince' },
      { value: 'America/Rio_Branco', text: '(UTC-05:00) Rio Branco' },
      //        { value: 'America/Halifax', text: '(UTC-04:00) Atlantic Time - Halifax' },
      { value: 'America/Barbados', text: '(UTC-04:00) Barbados' },
      //        { value: 'Atlantic/Bermuda', text: '(UTC-04:00) Bermuda' },
      { value: 'America/Boa_Vista', text: '(UTC-04:00) Boa Vista' },
      { value: 'America/Caracas', text: '(UTC-04:00) Caracas' },
      { value: 'America/Curacao', text: '(UTC-04:00) Curacao' },
      { value: 'America/Grand_Turk', text: '(UTC-04:00) Grand Turk' },
      { value: 'America/Guyana', text: '(UTC-04:00) Guyana' },
      { value: 'America/La_Paz', text: '(UTC-04:00) La Paz' },
      { value: 'America/Manaus', text: '(UTC-04:00) Manaus' },
      { value: 'America/Martinique', text: '(UTC-04:00) Martinique' },
      { value: 'America/Port_of_Spain', text: '(UTC-04:00) Port of Spain' },
      { value: 'America/Porto_Velho', text: '(UTC-04:00) Porto Velho' },
      { value: 'America/Puerto_Rico', text: '(UTC-04:00) Puerto Rico' },
      { value: 'America/Santo_Domingo', text: '(UTC-04:00) Santo Domingo' },
      //        { value: 'America/Thule', text: '(UTC-04:00) Thule' },
      //        { value: 'America/St_Johns', text: '(UTC-03:30) Newfoundland Time - St. Johns' },
      { value: 'America/Araguaina', text: '(UTC-03:00) Araguaina' },
      { value: 'America/Asuncion', text: '(UTC-03:00) Asuncion' },
      { value: 'America/Belem', text: '(UTC-03:00) Belem' },
      {
        value: 'America/Argentina/Buenos_Aires',
        text: '(UTC-03:00) Buenos Aires'
      },
      { value: 'America/Campo_Grande', text: '(UTC-03:00) Campo Grande' },
      { value: 'America/Cayenne', text: '(UTC-03:00) Cayenne' },
      //        { value: 'America/Cuiaba', text: '(UTC-03:00) Cuiaba' },
      { value: 'America/Fortaleza', text: '(UTC-03:00) Fortaleza' },
      //        { value: 'America/Godthab', text: '(UTC-03:00) Godthab' },
      { value: 'America/Maceio', text: '(UTC-03:00) Maceio' },
      //        { value: 'America/Miquelon', text: '(UTC-03:00) Miquelon' },
      { value: 'America/Montevideo', text: '(UTC-03:00) Montevideo' },
      { value: 'Antarctica/Palmer', text: '(UTC-03:00) Palmer' },
      { value: 'America/Paramaribo', text: '(UTC-03:00) Paramaribo' },
      { value: 'America/Punta_Arenas', text: '(UTC-03:00) Punta Arenas' },
      { value: 'America/Recife', text: '(UTC-03:00) Recife' },
      { value: 'Antarctica/Rothera', text: '(UTC-03:00) Rothera' },
      { value: 'America/Bahia', text: '(UTC-03:00) Salvador' },
      { value: 'America/Santiago', text: '(UTC-03:00) Santiago' },
      { value: 'Atlantic/Stanley', text: '(UTC-03:00) Stanley' },
      { value: 'America/Noronha', text: '(UTC-02:00) Noronha' },
      //        { value: 'America/Sao_Paulo', text: '(UTC-02:00) Sao Paulo' },
      { value: 'Atlantic/South_Georgia', text: '(UTC-02:00) South Georgia' },
      //        { value: 'Atlantic/Azores', text: '(UTC-01:00) Azores' },
      //        { value: 'Atlantic/Cape_Verde', text: '(UTC-01:00) Cape Verde' },
      //        { value: 'America/Scoresbysund', text: '(UTC-01:00) Scoresbysund' },
      { value: 'Africa/Abidjan', text: '(UTC+00:00) Abidjan' },
      { value: 'Africa/Accra', text: '(UTC+00:00) Accra' },
      { value: 'Africa/Bissau', text: '(UTC+00:00) Bissau' },
      //        { value: 'Atlantic/Canary', text: '(UTC+00:00) Canary Islands' },
      //        { value: 'Africa/Casablanca', text: '(UTC+00:00) Casablanca' },
      { value: 'America/Danmarkshavn', text: '(UTC+00:00) Danmarkshavn' },
      //        { value: 'Europe/Dublin', text: '(UTC+00:00) Dublin' },
      //        { value: 'Africa/El_Aaiun', text: '(UTC+00:00) El Aaiun' },
      //        { value: 'Atlantic/Faroe', text: '(UTC+00:00) Faeroe' },
      { value: 'Etc/UTC', text: '(UTC+00:00) UTC (no daylight saving)' },
      //        { value: 'Europe/Lisbon', text: '(UTC+00:00) Lisbon' },
      //        { value: 'Europe/London', text: '(UTC+00:00) London' },
      { value: 'Africa/Monrovia', text: '(UTC+00:00) Monrovia' },
      { value: 'Atlantic/Reykjavik', text: '(UTC+00:00) Reykjavik' },
      // { value: 'UTC', text: 'UTC' },
      { value: 'Africa/Algiers', text: '(UTC+01:00) Algiers' },
      //        { value: 'Europe/Amsterdam', text: '(UTC+01:00) Amsterdam' },
      //        { value: 'Europe/Andorra', text: '(UTC+01:00) Andorra' },
      //        { value: 'Europe/Berlin', text: '(UTC+01:00) Berlin' },
      //        { value: 'Europe/Brussels', text: '(UTC+01:00) Brussels' },
      //       { value: 'Europe/Budapest', text: '(UTC+01:00) Budapest' },
      //        { value: 'Europe/Belgrade', text: '(UTC+01:00) Central European Time - Belgrade' },
      //        { value: 'Europe/Prague', text: '(UTC+01:00) Central European Time - Prague' },
      //        { value: 'Africa/Ceuta', text: '(UTC+01:00) Ceuta' },
      //        { value: 'Europe/Copenhagen', text: '(UTC+01:00) Copenhagen' },
      //        { value: 'Europe/Gibraltar', text: '(UTC+01:00) Gibraltar' },
      { value: 'Africa/Lagos', text: '(UTC+01:00) Lagos' },
      //        { value: 'Europe/Luxembourg', text: '(UTC+01:00) Luxembourg' },
      //        { value: 'Europe/Madrid', text: '(UTC+01:00) Madrid' },
      //        { value: 'Europe/Malta', text: '(UTC+01:00) Malta' },
      //        { value: 'Europe/Monaco', text: '(UTC+01:00) Monaco' },
      { value: 'Africa/Ndjamena', text: '(UTC+01:00) Ndjamena' },
      //        { value: 'Europe/Oslo', text: '(UTC+01:00) Oslo' },
      //        { value: 'Europe/Paris', text: '(UTC+01:00) Paris' },
      //        { value: 'Europe/Rome', text: '(UTC+01:00) Rome' },
      //        { value: 'Europe/Stockholm', text: '(UTC+01:00) Stockholm' },
      //        { value: 'Europe/Tirane', text: '(UTC+01:00) Tirane' },
      //        { value: 'Africa/Tunis', text: '(UTC+01:00) Tunis' },
      //        { value: 'Europe/Vienna', text: '(UTC+01:00) Vienna' },
      //        { value: 'Europe/Warsaw', text: '(UTC+01:00) Warsaw' },
      //        { value: 'Europe/Zurich', text: '(UTC+01:00) Zurich' },
      //        { value: 'Asia/Amman', text: '(UTC+02:00) Amman' },
      //        { value: 'Europe/Athens', text: '(UTC+02:00) Athens' },
      //        { value: 'Asia/Beirut', text: '(UTC+02:00) Beirut' },
      //        { value: 'Europe/Bucharest', text: '(UTC+02:00) Bucharest' },
      { value: 'Africa/Cairo', text: '(UTC+02:00) Cairo' },
      //        { value: 'Europe/Chisinau', text: '(UTC+02:00) Chisinau' },
      //        { value: 'Asia/Damascus', text: '(UTC+02:00) Damascus' },
      //        { value: 'Asia/Gaza', text: '(UTC+02:00) Gaza' },
      //        { value: 'Europe/Helsinki', text: '(UTC+02:00) Helsinki' },
      //        { value: 'Asia/Jerusalem', text: '(UTC+02:00) Jerusalem' },
      { value: 'Africa/Johannesburg', text: '(UTC+02:00) Johannesburg' },
      { value: 'Africa/Khartoum', text: '(UTC+02:00) Khartoum' },
      //        { value: 'Europe/Kiev', text: '(UTC+02:00) Kiev' },
      { value: 'Africa/Maputo', text: '(UTC+02:00) Maputo' },
      {
        value: 'Europe/Kaliningrad',
        text: '(UTC+02:00) Moscow-01 - Kaliningrad'
      },
      //        { value: 'Asia/Nicosia', text: '(UTC+02:00) Nicosia' },
      //        { value: 'Europe/Riga', text: '(UTC+02:00) Riga' },
      //       { value: 'Europe/Sofia', text: '(UTC+02:00) Sofia' },
      //        { value: 'Europe/Tallinn', text: '(UTC+02:00) Tallinn' },
      { value: 'Africa/Tripoli', text: '(UTC+02:00) Tripoli' },
      //        { value: 'Europe/Vilnius', text: '(UTC+02:00) Vilnius' },
      { value: 'Africa/Windhoek', text: '(UTC+02:00) Windhoek' },
      { value: 'Asia/Baghdad', text: '(UTC+03:00) Baghdad' },
      { value: 'Europe/Istanbul', text: '(UTC+03:00) Istanbul' },
      { value: 'Europe/Minsk', text: '(UTC+03:00) Minsk' },
      { value: 'Europe/Moscow', text: '(UTC+03:00) Moscow+00 - Moscow' },
      { value: 'Africa/Nairobi', text: '(UTC+03:00) Nairobi' },
      { value: 'Asia/Qatar', text: '(UTC+03:00) Qatar' },
      { value: 'Asia/Riyadh', text: '(UTC+03:00) Riyadh' },
      { value: 'Antarctica/Syowa', text: '(UTC+03:00) Syowa' },
      { value: 'Asia/Tehran', text: '(UTC+03:30) Tehran' },
      { value: 'Asia/Baku', text: '(UTC+04:00) Baku' },
      { value: 'Asia/Dubai', text: '(UTC+04:00) Dubai' },
      { value: 'Indian/Mahe', text: '(UTC+04:00) Mahe' },
      { value: 'Indian/Mauritius', text: '(UTC+04:00) Mauritius' },
      { value: 'Europe/Samara', text: '(UTC+04:00) Moscow+01 - Samara' },
      { value: 'Indian/Reunion', text: '(UTC+04:00) Reunion' },
      { value: 'Asia/Tbilisi', text: '(UTC+04:00) Tbilisi' },
      { value: 'Asia/Yerevan', text: '(UTC+04:00) Yerevan' },
      { value: 'Asia/Kabul', text: '(UTC+04:30) Kabul' },
      { value: 'Asia/Aqtau', text: '(UTC+05:00) Aqtau' },
      { value: 'Asia/Aqtobe', text: '(UTC+05:00) Aqtobe' },
      { value: 'Asia/Ashgabat', text: '(UTC+05:00) Ashgabat' },
      { value: 'Asia/Dushanbe', text: '(UTC+05:00) Dushanbe' },
      { value: 'Asia/Karachi', text: '(UTC+05:00) Karachi' },
      { value: 'Indian/Kerguelen', text: '(UTC+05:00) Kerguelen' },
      { value: 'Indian/Maldives', text: '(UTC+05:00) Maldives' },
      { value: 'Antarctica/Mawson', text: '(UTC+05:00) Mawson' },
      {
        value: 'Asia/Yekaterinburg',
        text: '(UTC+05:00) Moscow+02 - Yekaterinburg'
      },
      { value: 'Asia/Tashkent', text: '(UTC+05:00) Tashkent' },
      { value: 'Asia/Colombo', text: '(UTC+05:30) Colombo' },
      { value: 'Asia/Kolkata', text: '(UTC+05:30) India Standard Time' },
      { value: 'Asia/Katmandu', text: '(UTC+05:45) Katmandu' },
      { value: 'Asia/Almaty', text: '(UTC+06:00) Almaty' },
      { value: 'Asia/Bishkek', text: '(UTC+06:00) Bishkek' },
      { value: 'Indian/Chagos', text: '(UTC+06:00) Chagos' },
      { value: 'Asia/Dhaka', text: '(UTC+06:00) Dhaka' },
      { value: 'Asia/Omsk', text: '(UTC+06:00) Moscow+03 - Omsk' },
      { value: 'Asia/Thimphu', text: '(UTC+06:00) Thimphu' },
      { value: 'Antarctica/Vostok', text: '(UTC+06:00) Vostok' },
      { value: 'Indian/Cocos', text: '(UTC+06:30) Cocos' },
      { value: 'Asia/Yangon', text: '(UTC+06:30) Rangoon' },
      { value: 'Asia/Bangkok', text: '(UTC+07:00) Bangkok' },
      { value: 'Indian/Christmas', text: '(UTC+07:00) Christmas' },
      { value: 'Antarctica/Davis', text: '(UTC+07:00) Davis' },
      { value: 'Asia/Saigon', text: '(UTC+07:00) Hanoi' },
      { value: 'Asia/Hovd', text: '(UTC+07:00) Hovd' },
      { value: 'Asia/Jakarta', text: '(UTC+07:00) Jakarta' },
      { value: 'Asia/Krasnoyarsk', text: '(UTC+07:00) Moscow+04 - Krasnoyarsk' },
      { value: 'Asia/Brunei', text: '(UTC+08:00) Brunei' },
      { value: 'Asia/Shanghai', text: '(UTC+08:00) China Time - Beijing' },
      { value: 'Asia/Choibalsan', text: '(UTC+08:00) Choibalsan' },
      { value: 'Asia/Hong_Kong', text: '(UTC+08:00) Hong Kong' },
      { value: 'Asia/Kuala_Lumpur', text: '(UTC+08:00) Kuala Lumpur' },
      { value: 'Asia/Macau', text: '(UTC+08:00) Macau' },
      { value: 'Asia/Makassar', text: '(UTC+08:00) Makassar' },
      { value: 'Asia/Manila', text: '(UTC+08:00) Manila' },
      { value: 'Asia/Irkutsk', text: '(UTC+08:00) Moscow+05 - Irkutsk' },
      { value: 'Asia/Singapore', text: '(UTC+08:00) Singapore' },
      { value: 'Asia/Taipei', text: '(UTC+08:00) Taipei' },
      { value: 'Asia/Ulaanbaatar', text: '(UTC+08:00) Ulaanbaatar' },
      { value: 'Australia/Perth', text: '(UTC+08:00) Western Time - Perth' },
      //        { value: 'Asia/Pyongyang', text: '(UTC+08:30) Pyongyang' },
      { value: 'Asia/Dili', text: '(UTC+09:00) Dili' },
      { value: 'Asia/Jayapura', text: '(UTC+09:00) Jayapura' },
      { value: 'Asia/Yakutsk', text: '(UTC+09:00) Moscow+06 - Yakutsk' },
      { value: 'Pacific/Palau', text: '(UTC+09:00) Palau' },
      { value: 'Asia/Seoul', text: '(UTC+09:00) Seoul' },
      { value: 'Asia/Tokyo', text: '(UTC+09:00) Tokyo' },
      { value: 'Australia/Darwin', text: '(UTC+09:30) Central Time - Darwin' },
      {
        value: 'Antarctica/DumontDUrville',
        text: '(UTC+10:00) Dumont D"Urville'
      },
      {
        value: 'Australia/Brisbane',
        text: '(UTC+10:00) Eastern Time - Brisbane'
      },
      { value: 'Pacific/Guam', text: '(UTC+10:00) Guam' },
      { value: 'Asia/Vladivostok', text: '(UTC+10:00) Moscow+07 - Vladivostok' },
      { value: 'Pacific/Port_Moresby', text: '(UTC+10:00) Port Moresby' },
      { value: 'Pacific / Chuuk', text: '(UTC+10:00) Truk' },
      {
        value: 'Australia/Adelaide',
        text: '(UTC+10:30) Central Time - Adelaide'
      },
      //        { value: 'Antarctica/Casey', text: '(UTC+11:00) Casey' },   //
      { value: 'Australia/Hobart', text: '(UTC+11:00) Eastern Time - Hobart' },
      {
        value: 'Australia/Sydney',
        text: '(UTC+11:00) Eastern Time - Melbourne, Sydney'
      },
      { value: 'Pacific/Efate', text: '(UTC+11:00) Efate' },
      { value: 'Pacific/Guadalcanal', text: '(UTC+11:00) Guadalcanal' },
      { value: 'Pacific/Kosrae', text: '(UTC+11:00) Kosrae' },
      { value: 'Asia/Magadan', text: '(UTC+11:00) Moscow+08 - Magadan' },
      { value: 'Pacific / Norfolk', text: '(UTC+11:00) Norfolk' },
      { value: 'Pacific/Noumea', text: '(UTC+11:00) Noumea' },
      { value: 'Pacific/Pohnpei', text: '(UTC+11:00) Ponape' },
      { value: 'Pacific/Funafuti', text: '(UTC+12:00) Funafuti' },
      { value: 'Pacific/Kwajalein', text: '(UTC+12:00) Kwajalein' },
      { value: 'Pacific/Majuro', text: '(UTC+12:00) Majuro' },
      {
        value: 'Asia/Kamchatka',
        text: '(UTC+12:00) Moscow+09 - Petropavlovsk - Kamchatskiy'
      },
      { value: 'Pacific / Nauru', text: '(UTC+12:00) Nauru' },
      { value: 'Pacific/Tarawa', text: '(UTC+12:00) Tarawa' },
      { value: 'Pacific/Wake', text: '(UTC+12:00) Wake' },
      { value: 'Pacific/Wallis', text: '(UTC+12:00) Wallis' },
      { value: 'Pacific/Auckland', text: '(UTC+13:00) Auckland' },
      { value: 'Pacific/Enderbury', text: '(UTC+13:00) Enderbury' },
      { value: 'Pacific/Fakaofo', text: '(UTC+13:00) Fakaofo' },
      //        { value: 'Pacific/Fiji', text: '(UTC+13:00) Fiji' },
      { value: 'Pacific/Tongatapu', text: '(UTC+13:00) Tongatapu' },
      { value: 'Pacific/Apia', text: '(UTC+14:00) Apia' },
      { value: 'Pacific/Kiritimati', text: '(UTC+14:00) Kiritimati' }
    ];
  
    static endCodings = ['UTF-8', 'ISO-8859-1', 'US-ASCII', 'UTF-16', 'None'];
  
    static isEmpty(obj): boolean {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }
  
    // (191212)
    static copyProperties(obj1, obj2) {
      for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
          obj1[key] = obj2.hasOwnProperty(key) ? obj2[key] : undefined;
        }
      }
    }
  
    // 191001
    static hasSameProperties(obj1, obj2): boolean {
      for (const key in obj1) {
        if (!obj2.hasOwnProperty(key)) return false;
      }
      for (const key in obj2) {
        if (!obj1.hasOwnProperty(key)) return false;
      }
      return true;
    }
  
    // 191002
    static hasSameStruct(obj1, obj2): boolean {
      const type1 = typeof obj1;
      const type2 = typeof obj2;
      if (type1 !== type2) return false;
      if (type1 === 'object') {
        //  object, null, array
        for (const key in obj1) {
          if (!obj2.hasOwnProperty(key)) return false;
          else {
            if (!this.hasSameStruct(obj1[key], obj2[key])) return false;
          }
        }
        for (const key in obj2) {
          if (!obj1.hasOwnProperty(key)) return false;
          else {
            if (!this.hasSameStruct(obj2[key], obj1[key])) return false;
          }
        }
      }
      return true;
    }
  
    // 191001
    static isArrayRepeatting(arr: any) {
      if (Array.isArray(arr)) {
        for (let i = 1; i < arr.length; i++) {
          if (!this.hasSameStruct(arr[0], arr[i])) return false;
        }
        return true;
      }
    }
  
    static hasSameProperties1(obj1, obj2) {
      return Object.keys(obj1).every(property => {
        return obj2.hasOwnProperty(property);
      });
    }
  
    // 190814
    static objectProperties(obj) {
      const properties = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          properties.push(key);
        }
      }
  
      return properties;
    }
  
    // (181224)
    static objStringify(obj) {
      let s = '';
      if (obj !== undefined)
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) s += ' ' + key + '=' + obj[key];
        }
      return s;
    }
  
    // (181224)
    static stringToXml(oString) {
      return new DOMParser().parseFromString(oString, 'text/xml');
    }
  
    //////////////////////////////////////////
    static myBrowser() {
      const ua = navigator.userAgent;
      let tem;
      let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return { name: 'IE', version: tem[1] || '' };
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/);
        if (tem != null) {
          return { name: 'Opera', version: tem[1] };
        }
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      tem = ua.match(/version\/(\d+)/i);
      if (tem != null) {
        M.splice(1, 1, tem[1]);
      }
      return {
        name: M[0],
        version: M[1]
      };
    }
  
    static base64ToBlob(base64, mimetype?, slicesize?) {
      if (!window.atob || !window.Uint8Array) {
        // The current browser doesn't have the atob function. Cannot continue
        return null;
      }
      mimetype = mimetype || '';
      slicesize = slicesize || 512;
      const bytechars = atob(base64);
      const bytearrays = [];
      for (let offset = 0; offset < bytechars.length; offset += slicesize) {
        const slice = bytechars.slice(offset, offset + slicesize);
        const bytenums = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          bytenums[i] = slice.charCodeAt(i);
        }
        const bytearray = new Uint8Array(bytenums);
        bytearrays[bytearrays.length] = bytearray;
      }
      return new Blob(bytearrays, { type: mimetype });
    }
  
    // (190613)
    static exportObjtoFile(base64, filename) {
      const blob = this.base64ToBlob(base64);
  
      let msg = '';
      let type = '';
      const browser = this.myBrowser();
  
      if (browser === undefined) {
        msg = 'Your browser is not support.';
        type = 'danger';
      }
  
      if (browser.name === 'MSIE' && browser.version === '9') {
        // IE9 has no API for handling downloads using Blob objects, and doesn't support the download attribute
        // Only works for IE10 and up, including Edge
        msg = 'Your browser is not support.';
        type = 'danger';
      } else if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // Provides a prompt to save the file to a location of users choice
        // window.navigator.msSaveBlob(blob, filename);
        window.navigator.msSaveOrOpenBlob(blob, filename);
        msg = 'Operation export file successfully.';
        type = 'success';
      }
      // Browsers that adhere to current standards can implement downloads
      // using the Blob object with the download anchor attribute
      // ---
      // NOTE: Edge 13+ is compliant with both these standards, but Edge 12
      // does not support the download anchor attribute so all versions
      // have been grouped to use the propriety `msSaveBlob` method
      else {
        // Use the Blob object to create an object URL to download the file
        const URL = window.URL;
        const downloadUrl = URL.createObjectURL(blob);
  
        // var filelink = document.createElement('a');
  
        let anchor = document.createElement('a');
        if (typeof anchor !== 'undefined') {
          anchor.href = downloadUrl;
          anchor.download = filename;
          anchor.target = '_blank';
          document.body.appendChild(anchor); // Required by Firefox
          anchor.click();
  
          // Release the existing object URL, and the anchor
          setTimeout(() => {
            URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(anchor);
            anchor = null;
          }, 100);
          msg = 'Operation export file successfully.';
          type = 'success';
        } else {
          msg = 'Your browser is not support.';
          type = 'danger';
        }
      }
  
      return {
        type,
        msg
      };
    }
  
    // (190701A), output format: yyyy-MM-dd //T00:00:00
    static convertDateToDateStr(objDate) {
      if (typeof objDate === 'object') {
        if (objDate == null) {
          return null;
        }
        const year = objDate.getFullYear().toString();
        let month = (objDate.getMonth() + 1).toString(); // month range from 0 - 11
        let date = objDate.getDate().toString();
        if (month.length === 1) {
          month = '0' + month;
        }
        if (date.length === 1) {
          date = '0' + date;
        }
        return year + '-' + month + '-' + date; // +'T00:00:000Z';
      } else if (typeof objDate === 'string') return objDate;
      else return null;
    }
  
    static formatdigits(val) {
      val = val.toString();
      return val.length === 1 ? '0' + val : val;
    }
  
    // MM/DD/YYYY HH:mm AM/PM
    static convertDatetimeToDateStr(dt) {
      let res = '';
      res += this.formatdigits(dt.getMonth() + 1);
      res += '/';
      res += this.formatdigits(dt.getDate());
      res += '/';
      res += this.formatdigits(dt.getFullYear());
      res += ' ';
      res += this.formatdigits(dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours());
      res += ':';
      res += this.formatdigits(dt.getMinutes());
      //        res += ":";
      //        res += this.formatdigits(dt.getSeconds());
      res += ' ';
      res += dt.getHours() > 11 ? ' PM' : ' AM';
      return res;
    }
  
    static isGUID(str) {
      const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const match = regex.exec(str);
      return match != null;
    }
  
    // (190808)
    static getLocaleTimezone() {
      const dt = new Date();
      const offset = -dt.getTimezoneOffset(); // - minus
      const tz = this.timeZones.find(
        item =>
          (item.text.substring(3, 4) === '-' ? -1 : 1) *
            (Number(item.text.substring(4, 7)) * 60 + Number(item.text.substring(8, 10))) ===
          offset
      );
      if (tz !== undefined && tz.value !== undefined) return tz.value;
      else return '';
    }
  
    // (190808)
    static getLocaleTimezone_text() {
      const dt = new Date();
      const offset = -dt.getTimezoneOffset(); // - minus
      const tz = this.timeZones.find(
        item =>
          (item.text.substring(3, 4) === '-' ? -1 : 1) *
            (Number(item.text.substring(4, 7)) * 60 + Number(item.text.substring(8, 10))) ===
          offset
      );
      if (tz !== undefined && tz.text !== undefined) return tz.text;
      else return '';
    }
  
    // (190808)
    static getLocaleTimeDesiredTimezone(dt, timeZone) {
      const tz = this.timeZones.find(item => item.value === timeZone);
      let targetTimeOffset = 0;
      if (tz !== undefined && tz.text !== undefined)
        targetTimeOffset =
          (tz.text.substring(3, 4) === '-' ? -1 : 1) *
          // var targetTimeOffset = -5 * 60; //desired time zone, taken as GMT-5
          (Number(tz.text.substring(4, 7)) * 60 + Number(tz.text.substring(8, 10)));
  
      dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset() + targetTimeOffset);
      return dt;
    }
  
    static toDateString(dateTime) {
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const formattedDate = dateTime.getDate() + '-' + months[dateTime.getMonth()] + '-' + dateTime.getFullYear();
      return formattedDate;
    }
  
    static copyInputMessage(inputElement) {
      inputElement.select();
      document.execCommand('copy');
      inputElement.setSelectionRange(0, 0);
    }
  
    static toggleOverlay() {
      document.getElementById('overlay').style.display =
        document.getElementById('overlay').style.display === 'block' ? 'none' : 'block';
    }
    static isGuidEmpty(str: string) {
      return str === '00000000-0000-0000-0000-000000000000';
    }
    static isValidUrl(str: string) {
      try {
        const url = new URL(str);
      } catch (_) {
        return false;
      }
  
      return true;
    }
  }
  