import React, { ChangeEvent, FC, useEffect, useState } from "react";
import classes from "./App.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  useQueryParams,
  NumberParam,
  StringParam,
  BooleanParam,
} from "use-query-params";
import { getBeer } from "./store/mainSlice";
import { RootState } from "./store";
import { IBeerItem } from "./types";
import Loader from "./components/loader/Loader";

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
        <label htmlFor="search" className={classes.label}>
          Search
        </label>
        <input
          className={classes.input}
          type="text"
          id="search"
          value={searchValue}
          onChange={searchHandler}
        />
      </div>
      <div className={classes.inputWrapper}>
        <label htmlFor="abv" className={classes.label}>
          Abv
        </label>
        <button onClick={abvDirectionHandler} className={classes.abvBtn}>
          {isAbvDirectionUp ? <span>&uarr;</span> : <span>&darr;</span>}
        </button>
        <input
          className={classes.input}
          type="number"
          id="abv"
          value={abv}
          onChange={abvHandler}
        />
      </div>
      {isSendingRequest ? (
        <Loader />
      ) : (
        <div className={classes.mainWrapper}>
          {beerList.map((item: IBeerItem, index: number) => (
            <div className={classes.item} key={`beer${index}`}>
              <img src={item.image_url} alt="" className={classes.img} />
              <p className={classes.name}>{item.name}</p>
              <p className={classes.abv}>{item.abv}</p>
              <p className={classes.description}>{item.description}</p>
            </div>
          ))}
        </div>
      )}
      <div className={classes.pagination}>
        <button
          disabled={page === 1}
          onClick={prevPage}
          className={classes.btn}
        >
          &lt;
        </button>
        <p className={classes.numberPage}>{page}</p>
        <button onClick={nextPage} className={classes.btn}>
          &gt;
        </button>
      </div>
    </>
  );
};

export default App;
