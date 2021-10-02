# Local .env
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # For instance, will be example_kaggle_key
    # npx apollo schema:download --endpoint=$NEXT_PUBLIC_GRAPHQL_URI --header "X-Hasura-Admin-Secret: ${HASURA_SECRET}"
    NEXT_PUBLIC_GRAPHQL_URI=$NEXT_PUBLIC_GRAPHQL_URI HASURA_SECRET=$HASURA_SECRET yarn generate
fi