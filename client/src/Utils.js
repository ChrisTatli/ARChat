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

  static toRad(val) { 
    return val*Math.PI/180; 
  }
  static calculateDistance(location1, location2) {
    if (location1.latitude != null && location1.longitude != null &&
        location2.latitude != null && location2.longitude != null) {
        let Radius = 6371000; 
        let theta1 = this.toRad(location1.latitude); 
        let theta2 = this.toRad(location2.latitude); 
        let dlambda = this.toRad(location2.longitude-location1.longitude); 
        let dtheta = this.toRad(location2.latitude-location1.latitude); 
        let a = Math.sin(dtheta/2) * Math.sin(dtheta/2) + 
                Math.cos(theta1) * Math.cos(theta2) * 
                Math.sin(dlambda/2) * Math.sin(dlambda/2); 
        let c = 2 * Math.atan2(Math.sqrt(a)); 
        let dist = c*Radius; 
        return dist.toFixed(2).toString(); 
    }
    return;
  }

  static calculateBearing(location1, location2) {
    if (location1.latitude != null && location1.longitude != null &&
        location2.latitude != null && location2.longitude != null) {
        let theta1 = this.toRad(location1.latitude); 
        let theta2 = this.toRad(location2.latitude); 
        let dLambda = this.toRad(location2.longitude-location1.longitude); 
        let y = Math.sin(dLambda)*Math.cos(theta2); 
        let x = Math.cos(theta1)*Math.sin(theta2)-Math.sin(theta1)*Math.cos(theta2)*Math.cos(dLambda); 
        let brng = Math.atan2(y,x)*180/Math.PI; 
        return brng.toFixed(2); 
    }
    return;
  }
 
  static async getDirections(startLoc, destinationLoc) { 
    try { 
        var resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`) 
        var respJson = await resp.json(); 
        var points = Polyline.decode(respJson.routes[0].overview_polyline.points); 
        var coords = points.map((point, index) => { 
            return  { 
                latitude : point[0], 
                longitude : point[1] 
            } 
        }) 
        return coords 
    } catch(error) { 
        return error 
    } 
  } 
 
}




