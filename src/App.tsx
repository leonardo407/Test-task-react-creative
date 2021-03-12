import React, { ChangeEvent, FC, useEffect, useState } from "react";
import classes from "./App.module.scss";
import { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import {
  useQueryParams,
  NumberParam,
  StringParam,
  BooleanParam,
} from "use-query-params";
import { getBeer } from "./store/mainSlice";
import { IBeerItem } from "./types";
import Loader from "./components/loader/Loader";
import Input from "./components/UI/Input/Input";
import Pagination from "./components/pagination/Pagination";
import BeerItem from "./components/beerItem/BeerItem";
import Button from "./components/UI/Button/Button";

const App: FC = () => {
  const dispatch = useDispatch();

  const beerList = useSelector((state: RootState) => state.main.beerList);
  const isSendingRequest = useSelector(
    (state: RootState) => state.main.isSendingRequest
  );

  const [page, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [abv, setAbv] = useState<number>(5);
  const [isAbvDirectionUp, setIsAbvDirectionUp] = useState<boolean>(true);

  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    search_value: StringParam,
    abv: NumberParam,
    abv_direction: BooleanParam,
  });

  useEffect(() => {
    dispatch(getBeer(page, searchValue, abv, isAbvDirectionUp));
  }, [page, searchValue, abv, isAbvDirectionUp]);

  useEffect(() => {
    if (query.page) {
      setPage(query.page);
    }

    if (query.search_value) {
      setSearchValue(query.search_value);
    }

    if (query.abv) {
      setAbv(query.abv);
    }

    if (typeof query.abv_direction === "boolean") {
      setIsAbvDirectionUp(query.abv_direction);
    }
  }, []);

  useEffect(() => {
    setQuery({
      page: page,
      search_value: searchValue,
      abv: abv,
      abv_direction: isAbvDirectionUp,
    });
  }, [page, searchValue, abv, isAbvDirectionUp]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const abvHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAbv(e.target.value as any);
  };

  const abvDirectionHandler = () => {
    setIsAbvDirectionUp(!isAbvDirectionUp);
  };

  return (
    <>
      <h2 className={classes.title}>Page {page}</h2>

      <div className={classes.inputWrapper}>
        <Input
          value={searchValue}
          onChange={searchHandler}
          id="search"
          label="Search"
        />
      </div>

      <div className={classes.inputWrapper}>
        <Input
          value={abv}
          onChange={abvHandler}
          id="abv"
          type="number"
          label="Abv"
        />
        <Button onClick={abvDirectionHandler}>
          {isAbvDirectionUp ? <span>&uarr;</span> : <span>&darr;</span>}
        </Button>
      </div>

      {isSendingRequest ? (
        <Loader />
      ) : (
        <div className={classes.mainWrapper}>
          {beerList.map((item: IBeerItem, index: number) => (
            <BeerItem beerItem={item} key={`beer${index}`} />
          ))}
        </div>
      )}

      <Pagination page={page} nextPage={nextPage} prevPage={prevPage} />
    </>
  );
};

export default App;
