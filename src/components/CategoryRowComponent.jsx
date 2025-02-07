import {useNavigate} from "react-router-dom";
import DeleteModal from "./DeleteComponent";
import {useState} from "react";
import {deleteCategory} from "../api";
import {useAppContext} from "../AppContext";

const CategoryRowComponent = ({index, category, count }) => {
    const navigate = useNavigate();
    const {deleteCatDropDown} = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        setIsModalOpen(false);
        const result = await deleteCategory(category);
        window.dispatchEvent(new Event('invalidate-categories-cache'));
        window.dispatchEvent(new Event('invalidate-sights-cache'));
        deleteCatDropDown(category)
        navigate('/')
    };

    function updateCategory (categoryName)  {
        navigate(`/categories/${categoryName}/update`, { state: { category: categoryName } });
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{category}</td>
            <td>{count}</td>
            <td>
                <button
                    className="cat"
                    onClick={() => updateCategory(category)}>
                    Update
                </button>
            </td>
            <td>
                <button className="cat" onClick={() => setIsModalOpen(true)}>Delete</button>
                    <DeleteModal
                        show={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onConfirm={handleDelete}/>
            </td>
        </tr>
    );
};

export default CategoryRowComponent;