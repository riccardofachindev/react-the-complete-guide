import MealItem from './MealItem';
import useHttp from '../hooks/useHttp'
import Error from '../UI/Error'

const initialConfig = {};

export default function Meals() {
    const { data: meals, isLoading, error } = useHttp('http://localhost:3000/meals', initialConfig, []);

    if (isLoading) {
        return <p className="center">Data is loading...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    return (
        <ul id="meals">
            {meals.map(meal => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    )
}