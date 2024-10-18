<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Commits][commits-shield]][commits-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/dokkazy/MelodicApp">
    <img src="images/OIG3.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Melodic App</h3>

  <p align="center">
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="">View Demo</a>
    ·
    <a href="https://github.com/dokkazy/MelodicApp/issues">Report Bug</a>
    ·
    <a href="https://github.com/dokkazy/MelodicApp/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<!-- 
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#start-environment">Start Environment</a>
    </li>
    <li><a href="#testing-cvproject-server-endpoints">Testing cvproject-server endpoints</a></li>
    <li><a href="#shutdown">Shutdown</a></li>
    <li><a href="#how-to-upgrade-cvproject-ui-dependencies-to-latest-version">How to upgrade cvproject-ui dependencies to latest version</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contributor">Contributor</a></li>
  </ol>
</details>
-->

<!-- ABOUT THE PROJECT -->


## About The Project

<!--[![Product Name Screen Shot][product-screenshot]](https://example.com)-->

This project is a ecommerce web app using nextjs as client and aspnet as server

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Built With
<!--
- [`Java 17+`](https://www.oracle.com/java/technologies/downloads/#java17)
- [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [`Docker`](https://www.docker.com/)
- [`Keycloak`](https://www.keycloak.org/)
-->

* [![Next][Next.js]][Next-url]
* [![.Net][dotnet.microsoft.com]][dotnet-url]
* [![Npm][npm.com]][npm-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Start Project
- BE :
  - Create Migration
    - CLI:
      ```
      dotnet ef migrations add InitialCreate --context (This is the first DbContext)
      ```
    - PM:
      ```
      Add-Migration InitialCreate -Context (This is the first DbContext)
      ```
  - Update Migration
    - CLI:
      ```
      dotnet ef update database --context (This is the first DbContext)
      ```
    - PM:
      ```
      Update-Database -Context (This is the first DbContext)
      ```

## Applications URLs

| Application       | URL                                   | Credentials                           |
|-------------------|---------------------------------------|---------------------------------------|
| Melodic API       | http://localhost:                     |                                       |
| melodic-app       | http://localhost:5173                 |                                       |


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## How to upgrade melodic-app dependencies to latest version

- In a terminal, make sure you are in `MelodicApp/melodic-app` folder

- Run the following commands
  ```
    npm upgrade
    npm i -g npm-check-updates
    ncu -u
    npm install
  ```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
<!--
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>
-->
## Contributor

<table>
  <tr align="center">
    <td align="center"><a href="https://github.com/kh0abug"><img src="https://avatars.githubusercontent.com/u/134161378?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>Tran Dang Khoa</b></sub></a><br />💻</a></td>
    <td align="center"><a href="https://github.com/wnosphan"><img src="https://avatars.githubusercontent.com/u/158177389?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>wnosphan</b></sub></a><br />💻</a></td>
    <td align="center"><a href="https://github.com/dokkazy"><img src="https://avatars.githubusercontent.com/u/87236537?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>Võ Công Huy</b></sub></a><br />💻</a></td>
    </td>
    <td align="center"><a href="https://github.com/ya3k"><img src="https://avatars.githubusercontent.com/u/98958049?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>ya3k</b></sub></a><br />💻</a></td>
    <td align="center"><a href="https://github.com/william-le1004"><img src="https://avatars.githubusercontent.com/u/87595769?v=4" width="100px;" alt="Donavon West"/><br /><sub><b>william-le1004</b></sub></a><br />💻</a></td>
   
  </tr>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/dokkazy/MelodicApp.svg?style=for-the-badge
[contributors-url]: https://github.com/dokkazy/MelodicApp/graphs/contributors
[commits-shield]: https://img.shields.io/github/commit-activity/w/dokkazy/MelodicApp?style=for-the-badge&labelColor=000000
[commits-url]: https://github.com/dokkazy/MelodicApp/graphs/commit-activity
[forks-shield]: https://img.shields.io/github/forks/dokkazy/MelodicApp.svg?style=for-the-badge
[forks-url]: https://github.com/dokkazy/MelodicApp/network/members
[stars-shield]: https://img.shields.io/github/stars/dokkazy/MelodicApp.svg?style=for-the-badge
[stars-url]: https://github.com/dokkazy/MelodicApp/stargazers
[issues-shield]: https://img.shields.io/github/issues/dokkazy/MelodicApp.svg?style=for-the-badge
[issues-url]: https://github.com/dokkazy/MelodicApp/issues
[license-shield]: https://img.shields.io/github/license/dokkazy/MelodicApp.svg?style=for-the-badge
[license-url]: https://github.com/dokkazy/MelodicApp/blob/master/LICENSE.txt
[product-screenshot]: images/OIG3.png
[Next.js]: https://img.shields.io/badge/Next-14-black?style=for-the-badge&logo=next.js&logoColor=white
[Next-url]: https://nextjs.org/
[dotnet.microsoft.com]: https://img.shields.io/badge/.NET-8-5C2D91?style=for-the-badge&logo=.net&logoColor=white
[dotnet-url]: https://dotnet.microsoft.com/en-us/apps/aspnet
[npm.com]: https://img.shields.io/badge/npm-ccc?style=for-the-badge&logo=npm&logoColor=#fff
[npm-url]: https://www.npmjs.com

