import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
  Table,
} from "reactstrap";
import Search from "./Search";

function CountryList() {
  const [countries, setCountries] = useState<any>([]);
  const [modal, setModal] = useState(true);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState(true);
  /* const url = "https://restcountries.eu/rest/v2/all";*/
  const getCountries = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        console.log(res.statusText);
        const data = res.data;
        setCountries(data);
        console.log("deneme");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
    console.log(modal);
  };
  const handleTerm = () => {
    if (searchTerm) {
      setSearchTerm(false);
    } else {
      setSearchTerm(true);
    }
  };
  useEffect(getCountries, []);
  const onSearch = (e) => {
    console.log(filter);
    const searchQuery = e.target.value.toLowerCase();
    setInput(e.target.value);

    const filteredCountries = countries.filter((countri) => {
      let searchValue;
      if (searchTerm) {
        searchValue = countri.name.toLowerCase();
      } else {
        searchValue = countri.capital.toLowerCase();
      }

      return searchValue.indexOf(searchQuery) > -1;
    });

    setFilter(filteredCountries);
  };
  return (
    <div className="">
      <div>
        <div className="buttons mb-3 d-flex justify-content-around">
          <Button onClick={changeModal} className="">
            {modal
              ? "Click to see the countries as a card"
              : "Click to see the countries as a table"}
          </Button>

          <Button onClick={handleTerm} className="">
            {searchTerm
              ? "Click to search by capital"
              : "Click to search by country name"}
          </Button>
        </div>
        <div className="">
          <Search
            input={input}
            onChange={onSearch}
            placeholder={searchTerm ? "Search Country" : "Search Capital"}
          />
        </div>

        {modal ? (
          <Table dark striped responsive className="col">
            <thead>
              <tr>
                <th>id</th>
                <th>Flag</th>
                <th>Country Name</th>
                <th>Capital</th>
                <th>Region</th>
              </tr>
            </thead>

            <tbody>
              {filter.length
                ? filter.map((country, index) => {
                    const { name, capital, region, flag } = country;
                    const url = "https://en.wikipedia.org/wiki/";

                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className="w-25">
                          <a href={flag} target="_blank" rel="noreferrer">
                            <img
                              className="w-50"
                              src={flag}
                              alt={name + "-flag"}
                            />
                          </a>
                        </td>

                        <td>
                          <a
                            className="text-decoration-none text-light"
                            href={url + name}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {name}
                          </a>
                        </td>
                        <td>{capital}</td>
                        <td>{region}</td>
                      </tr>
                    );
                  })
                : countries.map((country, index) => {
                    const { name, capital, region, flag } = country;
                    const url = "https://en.wikipedia.org/wiki/";

                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td className="w-25">
                          <a href={flag} target="_blank" rel="noreferrer">
                            <img
                              className="w-50"
                              src={flag}
                              alt={name + "-flag"}
                            />
                          </a>
                        </td>

                        <td>
                          <a
                            className="text-decoration-none text-light"
                            href={url + name}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {name}
                          </a>
                        </td>
                        <td>{capital}</td>
                        <td>{region}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </Table>
        ) : (
          <div className="row">
            {filter.length
              ? filter.map((country, index) => {
                  const {
                    name,
                    capital,
                    region,
                    flag,
                    population,
                  }: any = country;
                  const url = "https://en.wikipedia.org/wiki/";

                  return (
                    <Card className="col-sm-4 pr-3 bg-dark" outline key={index}>
                      <CardImg
                        width="100%"
                        height="50%"
                        src={flag}
                        alt="Card image cap"
                      />
                      <CardBody className="text-center">
                        <CardTitle tag="h4" className="text-light">
                          {name}
                        </CardTitle>

                        <CardText className="text-light">
                          Capital : {capital}
                        </CardText>
                        <CardText className="text-light">
                          Region: {region}
                        </CardText>
                        <CardText className="text-light">
                          Population: {population}
                        </CardText>
                      </CardBody>
                    </Card>
                  );
                })
              : countries.map((country, index) => {
                  const {
                    name,
                    capital,
                    region,
                    flag,
                    population,
                  }: any = country;
                  return (
                    <Card className="col-sm-4 pr-3 bg-dark" key={index}>
                      <CardImg
                        width="100%"
                        height="50%"
                        src={flag}
                        alt="Card image cap"
                      />
                      <CardBody className="text-center">
                        <CardTitle tag="h4" className="text-light">
                          {name}
                        </CardTitle>

                        <CardText className="text-light">
                          Capital : {capital}
                        </CardText>
                        <CardText className="text-light">
                          Region: {region}
                        </CardText>
                        <CardText className="text-light">
                          Population: {population}
                        </CardText>
                      </CardBody>
                    </Card>
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryList;
