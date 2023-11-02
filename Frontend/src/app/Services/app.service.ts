import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { users } from './user';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  token: string = '';
  islogin: boolean = false;
  user: any;
  isInstructor: Boolean = false;

  constructor(private http: HttpClient, private route: Router) {}

  getAllusers(){
    const header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.http.get("http://127.0.0.1:3000/users",{
      headers:header
    }).subscribe((val)=>{
      console.log(val)
    })
  }
  check() {
    return new Observable((observer) => {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token') as string;

        const body = {
          token,
        };
        this.http
          .post('http://127.0.0.1:3000/auth/check', body)
          .subscribe((res: any) => {
            if (!res.response) {
              localStorage.removeItem('token');
              observer.next(true);
            } else {
              this.token = token;
              this.islogin = true;
              this.getUserDetail().subscribe((val) => {
                observer.next(true);
              });
            }
          });
      } else {
        observer.next(true);
      }
    });
  }

  getUserDetail() {
    return new Observable((observer) => {
      const header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
      this.http
        .get('http://localhost:3000/users/detail', { headers: header })
        .subscribe((res) => {
          this.user = res;
          if (this.user.courses_created.length === 0) this.isInstructor = false;
          else this.isInstructor = true;
          observer.next('');
          // console.log(this.user, this.islogin, this.isInstructor)
        });
    });
  }
  getAllCourse() {
    return this.http.get('http://localhost:3000/courses').pipe(
      map((res) => {
        return <any>res;
      })
    );
  }

  getCourseDetail(id: string) {
    return this.http.get('http://localhost:3000/courses/' + id);
  }

  searchAndFilter(seaFil: any) {
    let queryString: string = '?';
    let query: string[] = [];

    if (seaFil.search) query.push(`search=${seaFil.search}`);
    if (seaFil.high) query.push(`price[lt]=${seaFil.high}`);
    if (seaFil.low) query.push(`price[gt]=${seaFil.low}`);
    if (seaFil.level) query.push(`level=${seaFil.level}`);
    if (seaFil.language) query.push(`language=${seaFil.language}`);

    queryString += query.join('&');
    return this.http.get('http://localhost:3000/courses' + queryString).pipe(
      map((res) => {
        return <any>res;
      })
    );
  }

  createCourse(courseInfo: any, image: any) {
    const body = {
      title: courseInfo.title,
      price: parseInt(courseInfo.price),
      description: courseInfo.description,
      duration: parseInt(courseInfo.duration),
      language: courseInfo.language,
      level: courseInfo.level,
    };
    console.log(body)
    const header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.http
      .post('http://localhost:3000/courses', body, {
        headers: header,
      })
      .subscribe((val: any) => {
        if (image) {
          const id = val._id;
          const formData = new FormData();
          formData.append('image', image);
          this.http.post(
            `http://localhost:3000/courses/thumbnail/${id}`,
            formData,
            {
              headers: header,
            }
          ).subscribe((val) => {
            console.log(val)
          });
        }
        this.getUserDetail().subscribe((val) => {
          this.route.navigate(["Instructor/allcourses"])
        });
      });
  }

  enroll(id: string) {
    const header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.http.post(
      `http://localhost:3000/users/enroll`,
      {
        id,
      },
      { headers: header }
    ).subscribe((val) => {
      this.getUserDetail().subscribe((val) => {
        this.route.navigate([`/enroll/${id}`])
      });
    });
  }

  signup(userInfo: any) {
    const body = {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
      password: userInfo.password,
    };

    this.http
      .post('http://localhost:3000/auth/signup', body)
      .subscribe(null, (err) => {
        this.route.navigate(['/signup']);
      });

    this.route.navigate(['/login']);
  }

  login(loginInfo: any) {
    const body = {
      email: loginInfo.email,
      password: loginInfo.password,
    };
    console.log('service login');
    this.http.post('http://localhost:3000/auth/login', body).subscribe(
      (data: any) => {
        console.log(data);
        this.token = data.accessToken;
        this.islogin = true;
        localStorage.setItem('token', this.token);
        this.getUserDetail().subscribe((val) => {
          console.log(this.isInstructor, this.islogin);
          this.route.navigate(['/']);
        });
      },
      (err) => {}
    );
  }

  updateProfile(userInfo: any, image: any) {
    const header = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    if (userInfo) {
      this.http
        .patch('http://localhost:3000/users', userInfo, {
          headers: header,
        })
        .subscribe((val: any) => {
          this.getUserDetail().subscribe((val) => {
            console.log(this.user)
          });
        });
    }
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      this.http
        .post(`http://localhost:3000/users/profile_picture`, formData, {
          headers: header,
        })
        .subscribe((val: any) => {
          this.getUserDetail().subscribe((val) => {});
        });
    }
  }
  reset() {
    this.user = null;
    this.token = '';
    this.isInstructor = false;
    this.islogin = false;
    this.route.navigate(['/home']);
  }

  //   user: {
  //     image: string;
  //     Firstname: string;
  //     Lastname: string;

  //   }[]=[
  //     {
  //       image: "../../../assets/person1.svg",
  //       name: "Abebe Tesfaye",
  //       email: "abebe12@gmail.com"
  //     },
  //     {
  //       image: "../../../assets/person2.svg",
  //       name: "Belay Beyene",
  //       email: "belay123@gmail.com"
  //     },
  //     {
  //       image: "../../../assets/person3.svg",
  //       name: "Alemu Asnake",
  //       email: "alemu21@gmail.com"
  //     },
  //     {
  //       image: "../../../assets/person2.svg",
  //       name: "Dawit Tesfaye",
  //       email: "dawit213@gmail.com"
  //     },
  //     {
  //       image: "../../../assets/person3.svg",
  //       name: "Abebe Tesfaye",
  //       email: "abebe12@gmail.com"
  //     },
  //     {
  //       image: "../../../assets/person1.svg",
  //       name: "Abebe Tesfaye",
  //       email: "abebe12@gmail.com"
  //     },
  //     {
  //       image: "../../../assets/person3.svg",
  //       name: "Belay Beyene",
  //       email: "belay123@gmail.com"
  //     },
  //     {
  //       image: "../../../assets/person1.svg",
  //       name: "Alemu Asnake",
  //       email: "alemu21@gmail.com"
  //     },
  //     {
  //       image: "../../../assets/person2.svg",
  //       name: "Dawit Tesfaye",
  //       email: "dawit213@gmail.com"
  //     },

  //   ];
  //   getStudent(){
  //     return this.students
  //   }

  //   courseCart = [{image:"./assets/c++_image.svg",
  //                       name: "Advanced C++",
  //                       Instructor: "Amanual",
  //                       price:"400"
  //                     },
  //                     {image:"./assets/c++_image.svg",
  //                     name: "Advanced C++",
  //                     Instructor: "Amanual",
  //                     price:"400"
  //                   },
  //                   {image:"./assets/c++_image.svg",
  //                   name: "Advanced C++",
  //                   Instructor: "Amanual",
  //                   price:"400"
  //                 }];
  //   courses = [
  //     {id: 1,
  //     title: "the fance",
  //     price: "90$",
  //     language:"Amharic",
  //     discription:"this will educate you"},
  //     {id: 1,
  //       title: "the fance",
  //       price: "90$",
  //       language:"Amharic",
  //       discription:"this will educate you"},
  //       {id: 1,
  //         title: "the fance",
  //         price: "90$",
  //         language:"Amharic",
  //         discription:"this will educate you"},
  //         {id: 1,
  //           title: "the fance",
  //           price: "90$",
  //           language:"Amharic",
  //           discription:"this will educate you"},
  //           {id: 1,
  //             title: "the fance",
  //             price: "90$",
  //             language:"Amharic",
  //             discription:"this will educate you"}
  //   ]

  //   getcourse() {
  //     return this.courses;
  //   }
  //   getCourseCart(){
  //     return this.courseCart;

  // }

  // coursedetail:{title:string
  //               discription:string,
  //               Instructor:string,
  //               level:string,
  //               studentNumber:number,
  //               language:string,
  //               price:number
  //   } = {title:"NestJs",
  //   discription:"this is a detaild course about nestJs you will learn about nest js in depth",
  //   Instructor:"Ayele Fereja",
  //   level:"Begginer",
  //   studentNumber:1200,
  //   language:"Amharic",
  //   price:200
  //   }
  //   getCourseDetail(){
  //     return this.coursedetail
  //   }

  // }
}
