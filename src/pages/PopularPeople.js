import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularPeople } from "actions";
import PersonCard from "containers/PersonCard";
import InfiniteGridList from "components/InfiniteGridList";
import {
  selectIsFetchingPopularPeople,
  selectPopularPeopleNextPage,
  selectPopularPeopleIds
} from "reducers";

function PopularPeople() {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => selectIsFetchingPopularPeople(state));
  const nextPage = useSelector(state => selectPopularPeopleNextPage(state));
  const personIds = useSelector(state => selectPopularPeopleIds(state));

  function handleLoadMore() {
    dispatch(fetchPopularPeople(nextPage));
  }

  return (
    <InfiniteGridList
      items={personIds}
      loading={isFetching}
      hasNextPage={!!nextPage}
      onLoadMore={handleLoadMore}
      keyExtractor={personId => personId}
      renderItem={personId => <PersonCard key={personId} personId={personId} />}
    />
  );
}

export default PopularPeople;