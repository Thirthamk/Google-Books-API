import SearchArea from "../../components/SearchArea";
import { useState } from "react";
import styles from "./Books.module.scss";
// import Grid from "../Grid/Grid";

const Books = () => {
    const [book, setBook] = useState("Please enter a valid book name");
    const [result, setResult] = useState([]);
    // const [bookContent, setBookContent] = useState(false);

    // const getBooks = async () => {
    //     const url = "https://www.googleapis.com/books/v1/volumes?q=java";

    //     const response = await fetch(url);

    //     const json = await response.json();

    //     // console.log("hello");
    //     // setBookContent(json.authors);
    // };
    // console.log();

    // console.log(getBooks());

    const handleChange = (event) => {
        const book = event.target.value;
        setBook(book);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // if (!bookContent) return;
        // console.log(book); event , useEffect
        // setBookContent(true);
        const url =
            "https://www.googleapis.com/books/v1/volumes?q=" +
            book +
            "&maxResults=40";
        console.log(url);

        const response = await fetch(url);

        const json = await response.json().catch((err) => {
            console.log(err);
        });

        setResult(json.items);

        // console.log(json.items);
        // // setBookContent(json.volumes);
        // console.log(json);
        // console.log("hello");

        // return json;
    };

    // useEffect(() => {
    //     setBookContent(true);
    // }, []);
    // const noBooks = () => {
    //     if (!setResult) {
    //         return "Sorry No books found in that name";
    //     }
    // };

    return (
        <div>
            <div className={styles.searcharea}>
                <SearchArea
                    Submit={handleSubmit}
                    Change={handleChange}
                ></SearchArea>
            </div>
            <div className={styles.book}>
                <div className={styles.grid}>
                    {result.map((books) => (
                        <div>
                            <a
                                target="_blank"
                                href={books.volumeInfo.previewLink}
                            >
                                <img
                                    src={books.volumeInfo.imageLinks.thumbnail}
                                    alt={books.title}
                                ></img>
                            </a>
                            <p>{books.volumeInfo.title}</p>
                            <p>{books.volumeInfo.authors}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Books;
