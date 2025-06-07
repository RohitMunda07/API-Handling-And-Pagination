import React, { useEffect, useState } from 'react'

function FeatchedData() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(true)

    const feathApiData = () => {

        try {
            setTimeout(async () => {
                const featchedData = await fetch(`https://dummyjson.com/products/?limit=10&skip=${page * 10 - 10}`)
                const res = await featchedData.json();

                setLoading(false)

                console.log("response", res.products);

                if (featchedData && res) {
                    setProducts(res.products);
                    setTotalPage(res.products.length)
                }
            }, 1000);

        } catch (error) {
            console.log('Something went wrong!!', error);
        }
    }

    const selectedPage = (selectedPage) => {
        setPage(selectedPage);
    }

    useEffect(() => {
        feathApiData();
        console.log('total length =', totalPage);
    }, [page, totalPage])

    return (
        <>
            {loading ?
                'loading...' :

                <div>
                    <h1 style={{color: "black"}}>API Handling</h1>
                    <section className='section-body'>
                        {products.map((currPro) => {
                            const { id, title, thumbnail, price } = currPro;
                            return (<li key={id}>
                                <img src={thumbnail} alt={title} />
                                <h2>{title}</h2>
                                <h2>${price}</h2>
                            </li>)
                        })}
                    </section>
                    {products.length > 0 && <div className='pagination'>
                        <button
                            className={page == 1 ? 'pagination_disable' : ''}
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        >◀️</button>

                        {[...Array(totalPage)].map((_, i) => {
                            return <span key={i}
                                className={`page_count ${i + 1 == page ? 'active' : ''}`}
                                onClick={() => selectedPage(i + 1)}
                            >{i + 1}</span>
                        })}

                        <button
                            className={page == totalPage ? 'pagination_disable' : ''}
                            onClick={() => setPage((prev) => Math.min(prev + 1, products.length))}
                        >▶️</button>
                    </div>
                    }
                </div>

            }
        </>
    )
}

export default FeatchedData

// Front-end driven code
// {products.slice(page * 10 - 10, page * 10).map((currPro) => {
//     const { id, title, thumbnail, price } = currPro;
//     return (<li key={id}>
//         <img src={thumbnail} alt={title} />
//         <h2>{title}</h2>
//         <h2>${price}</h2>
//     </li>)
// })}



// Array.from()
// Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
//   <span
//   key={pageNum}
//   className={`page_count ${pageNum === page ? 'active' : ''}`}
//   onClick={() => selectedPage(pageNum)}
// >
//   {pageNum}
// </span>
// ))
// --------------------------------------Working-----------------------------------------
// | Code                                         | Result                              |
// | -------------------------------------------- | ----------------------------------- |
// | `Array.from({ length: 3 })`                  | `[undefined, undefined, undefined]` |
// | `Array.from({ length: 3 }, (_, i) => i)`     | `[0, 1, 2]`                         |
// | `Array.from({ length: 3 }, (_, i) => i + 1)` | `[1, 2, 3]`                         |
