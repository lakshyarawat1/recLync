# %%
import numpy 
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity




def recommend_games(input_tags):
    games = pd.read_csv('games.csv')

    df = games.drop(['Estimated owners', 'Full audio languages' ,'Metacritic url', 'Notes', 'Peak CCU', 'DLC count', 'Metacritic score', 'User score', 'Score rank', 'Achievements', 'Recommendations', 'Average playtime forever', 'Average playtime two weeks', 'Median playtime forever', 'Median playtime two weeks'], axis=1)

    # %%
    input = input_tags.fetchone()[0]
    tags = input.split()

    tfidf_vectorizer = TfidfVectorizer()

    tfidf_matrix = tfidf_vectorizer.fit_transform(df['Tags'].values.astype('U'))

    tag_vector = tfidf_vectorizer.transform([" ".join(tags)])
    cosine_similarities = cosine_similarity(tfidf_matrix, tag_vector)

    top_n = 20
    similar_games_indices = cosine_similarities.flatten().argsort()[-top_n:][::-1]
    similiar_games = df.iloc[similar_games_indices]

    output_file = "output.csv"
    similiar_games.to_csv(output_file, index=False)

    return (f"Output Saved to {output_file}")