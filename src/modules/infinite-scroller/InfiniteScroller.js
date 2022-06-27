import React, { useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function InfiniteScroller({
  children,
  dataLength,
  loading = false,
  hasMore = true,
  next = () => false,
}) {
  //   const scrollParentRef = useRef(null);
  return (
    <InfiniteScroll dataLength={20} 
    // dataLength={items.length} //This is important field to render the next data
    // next={(data)=>console.log(data)}
    // hasMore={hasMore}
    // loader={<h4>Loading...</h4>}
    // endMessage={
    //   <p style={{ textAlign: 'center' }}>
    //     <b>Yay! You have seen it all</b>
    //   </p>
    // }
    // below props only if you need pull down functionality
    // refreshFunction={this.refresh}
    // pullDownToRefresh
    // pullDownToRefreshThreshold={50}
    // pullDownToRefreshContent={
    //   <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
    // }
    // releaseToRefreshContent={
    //   <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
    // }
    >
      {/* {children} */}

    </InfiniteScroll>
  );
}

// {this.state.loading &&
//     this.state.hasMore && (
//       <div
//         className="spinner"
//         style={{
//           bottom: "40px",
//           position: "absolute",
//           textAlign: "center",
//           width: "100%"
//         }}
//       >
//         <Spin />
//       </div>
//     )}
