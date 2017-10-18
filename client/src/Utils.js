export default class Utils {

  static validateEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if(email.length <= 0) { 
        return { 
            valid: false, 
            message: 'Please enter an email address.' 
          }; 
      }
      if(!regex.test(email)) { 
        return { 
            valid: false, 
            message: 'Please enter a valid email address.' 
          }; 
      }
    
      return { valid: true, message: 'Nice job, champ!' };
  }

  static validatePassword(password) {
    
    if(password.length < 8) {
      return {
        valid: false,
        message: 'Password must be at least 8 characters long.'
      };
    }
          
    return { valid: true, message: 'Nice job, champ!' };
  }

  static validateUsername(username) {
    const regex = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;
    
    if(username.length <= 0) { 
        return { 
            valid: false, 
            message: 'Please enter a username. '
        }; 
    }
    if(username.length > 20) { 
      return { 
          valid: false,
          message: 'Usernames cannot be more than 20 characters long.'
        };
    }
    if(!regex.test(username)) {
      return {
          valid: false,
          message: 'Usernames can only contain alphanumeric characters or'
                    + ' non-adjacent hyphens, and cannot begin with a hyphen.'
      }
    }

    return { valid: true, message: 'Nice job, champ!'}
  }

  static calculateDistance(location1, location2) {
    let latDist = 111*(location1.latitude - location2.latitude);
    let longDist = 111*(location1.longitude - location2.longitude);
    let dist = Math.sqrt(Math.pow(latDist, 2)+Math.pow(longDist, 2));
    return (dist*1000).toFixed(2).toString();
  }

  static calculateBearing(location1, location2) {
    let latDist = location1.latitude - location2.latitude;
    let longDist = location1.longitude - location2.longitude;
    let theta = Math.tan(longDist / latDist);
    if(longDist < 0) {
      let phi = 180 + theta;
    } else {
      let phi = 180 - theta;
    }
    return phi.toFixed(2).toString();
  }

}




