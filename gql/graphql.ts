/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  json: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  smallint: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "genres" */
export type Genres = {
  __typename?: 'genres';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  users_genres: Array<Users_Genres>;
  /** An aggregate relationship */
  users_genres_aggregate: Users_Genres_Aggregate;
};


/** columns and relationships of "genres" */
export type GenresUsers_GenresArgs = {
  distinct_on?: InputMaybe<Array<Users_Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Genres_Order_By>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};


/** columns and relationships of "genres" */
export type GenresUsers_Genres_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Genres_Order_By>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};

/** aggregated selection of "genres" */
export type Genres_Aggregate = {
  __typename?: 'genres_aggregate';
  aggregate?: Maybe<Genres_Aggregate_Fields>;
  nodes: Array<Genres>;
};

/** aggregate fields of "genres" */
export type Genres_Aggregate_Fields = {
  __typename?: 'genres_aggregate_fields';
  avg?: Maybe<Genres_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Genres_Max_Fields>;
  min?: Maybe<Genres_Min_Fields>;
  stddev?: Maybe<Genres_Stddev_Fields>;
  stddev_pop?: Maybe<Genres_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Genres_Stddev_Samp_Fields>;
  sum?: Maybe<Genres_Sum_Fields>;
  var_pop?: Maybe<Genres_Var_Pop_Fields>;
  var_samp?: Maybe<Genres_Var_Samp_Fields>;
  variance?: Maybe<Genres_Variance_Fields>;
};


/** aggregate fields of "genres" */
export type Genres_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Genres_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Genres_Avg_Fields = {
  __typename?: 'genres_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "genres". All fields are combined with a logical 'AND'. */
export type Genres_Bool_Exp = {
  _and?: InputMaybe<Array<Genres_Bool_Exp>>;
  _not?: InputMaybe<Genres_Bool_Exp>;
  _or?: InputMaybe<Array<Genres_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  users_genres?: InputMaybe<Users_Genres_Bool_Exp>;
  users_genres_aggregate?: InputMaybe<Users_Genres_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "genres" */
export enum Genres_Constraint {
  /** unique or primary key constraint on columns "id" */
  GenresPkey = 'genres_pkey'
}

/** input type for incrementing numeric columns in table "genres" */
export type Genres_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "genres" */
export type Genres_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  users_genres?: InputMaybe<Users_Genres_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Genres_Max_Fields = {
  __typename?: 'genres_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Genres_Min_Fields = {
  __typename?: 'genres_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "genres" */
export type Genres_Mutation_Response = {
  __typename?: 'genres_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Genres>;
};

/** input type for inserting object relation for remote table "genres" */
export type Genres_Obj_Rel_Insert_Input = {
  data: Genres_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Genres_On_Conflict>;
};

/** on_conflict condition type for table "genres" */
export type Genres_On_Conflict = {
  constraint: Genres_Constraint;
  update_columns?: Array<Genres_Update_Column>;
  where?: InputMaybe<Genres_Bool_Exp>;
};

/** Ordering options when selecting data from "genres". */
export type Genres_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  users_genres_aggregate?: InputMaybe<Users_Genres_Aggregate_Order_By>;
};

/** primary key columns input for table: genres */
export type Genres_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "genres" */
export enum Genres_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "genres" */
export type Genres_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Genres_Stddev_Fields = {
  __typename?: 'genres_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Genres_Stddev_Pop_Fields = {
  __typename?: 'genres_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Genres_Stddev_Samp_Fields = {
  __typename?: 'genres_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "genres" */
export type Genres_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Genres_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Genres_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Genres_Sum_Fields = {
  __typename?: 'genres_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "genres" */
export enum Genres_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

export type Genres_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Genres_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Genres_Set_Input>;
  /** filter the rows which have to be updated */
  where: Genres_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Genres_Var_Pop_Fields = {
  __typename?: 'genres_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Genres_Var_Samp_Fields = {
  __typename?: 'genres_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Genres_Variance_Fields = {
  __typename?: 'genres_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']['input']>;
  _gt?: InputMaybe<Scalars['json']['input']>;
  _gte?: InputMaybe<Scalars['json']['input']>;
  _in?: InputMaybe<Array<Scalars['json']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['json']['input']>;
  _lte?: InputMaybe<Scalars['json']['input']>;
  _neq?: InputMaybe<Scalars['json']['input']>;
  _nin?: InputMaybe<Array<Scalars['json']['input']>>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** columns and relationships of "links" */
export type Links = {
  __typename?: 'links';
  clicks?: Maybe<Scalars['bigint']['output']>;
  config?: Maybe<Scalars['jsonb']['output']>;
  created_at: Scalars['timestamptz']['output'];
  date_end?: Maybe<Scalars['timestamptz']['output']>;
  date_start?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  key?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  link?: Maybe<Links>;
  /** An array relationship */
  links: Array<Links>;
  /** An aggregate relationship */
  links_aggregate: Links_Aggregate;
  /** An array relationship */
  links_photos: Array<Links_Photos>;
  /** An aggregate relationship */
  links_photos_aggregate: Links_Photos_Aggregate;
  /** An array relationship */
  links_tags: Array<Links_Tags>;
  /** An aggregate relationship */
  links_tags_aggregate: Links_Tags_Aggregate;
  name?: Maybe<Scalars['String']['output']>;
  og_description?: Maybe<Scalars['String']['output']>;
  og_image?: Maybe<Scalars['String']['output']>;
  og_title?: Maybe<Scalars['String']['output']>;
  parameters?: Maybe<Scalars['jsonb']['output']>;
  parent_link?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  userByUser?: Maybe<Users>;
  /** An array relationship */
  widgets_links: Array<Widgets_Links>;
  /** An aggregate relationship */
  widgets_links_aggregate: Widgets_Links_Aggregate;
};


/** columns and relationships of "links" */
export type LinksConfigArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "links" */
export type LinksLinksArgs = {
  distinct_on?: InputMaybe<Array<Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Order_By>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Order_By>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_PhotosArgs = {
  distinct_on?: InputMaybe<Array<Links_Photos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Photos_Order_By>>;
  where?: InputMaybe<Links_Photos_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_Photos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Photos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Photos_Order_By>>;
  where?: InputMaybe<Links_Photos_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_TagsArgs = {
  distinct_on?: InputMaybe<Array<Links_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Tags_Order_By>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksLinks_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Tags_Order_By>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksParametersArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "links" */
export type LinksWidgets_LinksArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Links_Order_By>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};


/** columns and relationships of "links" */
export type LinksWidgets_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Links_Order_By>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};

/** aggregated selection of "links" */
export type Links_Aggregate = {
  __typename?: 'links_aggregate';
  aggregate?: Maybe<Links_Aggregate_Fields>;
  nodes: Array<Links>;
};

export type Links_Aggregate_Bool_Exp = {
  count?: InputMaybe<Links_Aggregate_Bool_Exp_Count>;
};

export type Links_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Links_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "links" */
export type Links_Aggregate_Fields = {
  __typename?: 'links_aggregate_fields';
  avg?: Maybe<Links_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Links_Max_Fields>;
  min?: Maybe<Links_Min_Fields>;
  stddev?: Maybe<Links_Stddev_Fields>;
  stddev_pop?: Maybe<Links_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Links_Stddev_Samp_Fields>;
  sum?: Maybe<Links_Sum_Fields>;
  var_pop?: Maybe<Links_Var_Pop_Fields>;
  var_samp?: Maybe<Links_Var_Samp_Fields>;
  variance?: Maybe<Links_Variance_Fields>;
};


/** aggregate fields of "links" */
export type Links_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "links" */
export type Links_Aggregate_Order_By = {
  avg?: InputMaybe<Links_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Links_Max_Order_By>;
  min?: InputMaybe<Links_Min_Order_By>;
  stddev?: InputMaybe<Links_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Links_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Links_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Links_Sum_Order_By>;
  var_pop?: InputMaybe<Links_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Links_Var_Samp_Order_By>;
  variance?: InputMaybe<Links_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Links_Append_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
  parameters?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "links" */
export type Links_Arr_Rel_Insert_Input = {
  data: Array<Links_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Links_On_Conflict>;
};

/** aggregate avg on columns */
export type Links_Avg_Fields = {
  __typename?: 'links_avg_fields';
  clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "links" */
export type Links_Avg_Order_By = {
  clicks?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "links". All fields are combined with a logical 'AND'. */
export type Links_Bool_Exp = {
  _and?: InputMaybe<Array<Links_Bool_Exp>>;
  _not?: InputMaybe<Links_Bool_Exp>;
  _or?: InputMaybe<Array<Links_Bool_Exp>>;
  clicks?: InputMaybe<Bigint_Comparison_Exp>;
  config?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  date_end?: InputMaybe<Timestamptz_Comparison_Exp>;
  date_start?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  link?: InputMaybe<Links_Bool_Exp>;
  links?: InputMaybe<Links_Bool_Exp>;
  links_aggregate?: InputMaybe<Links_Aggregate_Bool_Exp>;
  links_photos?: InputMaybe<Links_Photos_Bool_Exp>;
  links_photos_aggregate?: InputMaybe<Links_Photos_Aggregate_Bool_Exp>;
  links_tags?: InputMaybe<Links_Tags_Bool_Exp>;
  links_tags_aggregate?: InputMaybe<Links_Tags_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  og_description?: InputMaybe<String_Comparison_Exp>;
  og_image?: InputMaybe<String_Comparison_Exp>;
  og_title?: InputMaybe<String_Comparison_Exp>;
  parameters?: InputMaybe<Jsonb_Comparison_Exp>;
  parent_link?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Uuid_Comparison_Exp>;
  userByUser?: InputMaybe<Users_Bool_Exp>;
  widgets_links?: InputMaybe<Widgets_Links_Bool_Exp>;
  widgets_links_aggregate?: InputMaybe<Widgets_Links_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "links" */
export enum Links_Constraint {
  /** unique or primary key constraint on columns "id" */
  LinksIdKey = 'links_id_key',
  /** unique or primary key constraint on columns "key" */
  LinksKeyKey = 'links_key_key',
  /** unique or primary key constraint on columns "id" */
  LinksPkey = 'links_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Links_Delete_At_Path_Input = {
  config?: InputMaybe<Array<Scalars['String']['input']>>;
  parameters?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Links_Delete_Elem_Input = {
  config?: InputMaybe<Scalars['Int']['input']>;
  parameters?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Links_Delete_Key_Input = {
  config?: InputMaybe<Scalars['String']['input']>;
  parameters?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "links" */
export type Links_Inc_Input = {
  clicks?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "links" */
export type Links_Insert_Input = {
  clicks?: InputMaybe<Scalars['bigint']['input']>;
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  date_end?: InputMaybe<Scalars['timestamptz']['input']>;
  date_start?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Links_Obj_Rel_Insert_Input>;
  links?: InputMaybe<Links_Arr_Rel_Insert_Input>;
  links_photos?: InputMaybe<Links_Photos_Arr_Rel_Insert_Input>;
  links_tags?: InputMaybe<Links_Tags_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  og_description?: InputMaybe<Scalars['String']['input']>;
  og_image?: InputMaybe<Scalars['String']['input']>;
  og_title?: InputMaybe<Scalars['String']['input']>;
  parameters?: InputMaybe<Scalars['jsonb']['input']>;
  parent_link?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
  userByUser?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  widgets_links?: InputMaybe<Widgets_Links_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Links_Max_Fields = {
  __typename?: 'links_max_fields';
  clicks?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  date_end?: Maybe<Scalars['timestamptz']['output']>;
  date_start?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  og_description?: Maybe<Scalars['String']['output']>;
  og_image?: Maybe<Scalars['String']['output']>;
  og_title?: Maybe<Scalars['String']['output']>;
  parent_link?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "links" */
export type Links_Max_Order_By = {
  clicks?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date_end?: InputMaybe<Order_By>;
  date_start?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  og_description?: InputMaybe<Order_By>;
  og_image?: InputMaybe<Order_By>;
  og_title?: InputMaybe<Order_By>;
  parent_link?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Links_Min_Fields = {
  __typename?: 'links_min_fields';
  clicks?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  date_end?: Maybe<Scalars['timestamptz']['output']>;
  date_start?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  og_description?: Maybe<Scalars['String']['output']>;
  og_image?: Maybe<Scalars['String']['output']>;
  og_title?: Maybe<Scalars['String']['output']>;
  parent_link?: Maybe<Scalars['uuid']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "links" */
export type Links_Min_Order_By = {
  clicks?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date_end?: InputMaybe<Order_By>;
  date_start?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  og_description?: InputMaybe<Order_By>;
  og_image?: InputMaybe<Order_By>;
  og_title?: InputMaybe<Order_By>;
  parent_link?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "links" */
export type Links_Mutation_Response = {
  __typename?: 'links_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Links>;
};

/** input type for inserting object relation for remote table "links" */
export type Links_Obj_Rel_Insert_Input = {
  data: Links_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Links_On_Conflict>;
};

/** on_conflict condition type for table "links" */
export type Links_On_Conflict = {
  constraint: Links_Constraint;
  update_columns?: Array<Links_Update_Column>;
  where?: InputMaybe<Links_Bool_Exp>;
};

/** Ordering options when selecting data from "links". */
export type Links_Order_By = {
  clicks?: InputMaybe<Order_By>;
  config?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  date_end?: InputMaybe<Order_By>;
  date_start?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  link?: InputMaybe<Links_Order_By>;
  links_aggregate?: InputMaybe<Links_Aggregate_Order_By>;
  links_photos_aggregate?: InputMaybe<Links_Photos_Aggregate_Order_By>;
  links_tags_aggregate?: InputMaybe<Links_Tags_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  og_description?: InputMaybe<Order_By>;
  og_image?: InputMaybe<Order_By>;
  og_title?: InputMaybe<Order_By>;
  parameters?: InputMaybe<Order_By>;
  parent_link?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
  userByUser?: InputMaybe<Users_Order_By>;
  widgets_links_aggregate?: InputMaybe<Widgets_Links_Aggregate_Order_By>;
};

/** columns and relationships of "links_photos" */
export type Links_Photos = {
  __typename?: 'links_photos';
  id: Scalars['bigint']['output'];
  /** An object relationship */
  link?: Maybe<Links>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  object_id?: Maybe<Scalars['uuid']['output']>;
  sort?: Maybe<Scalars['smallint']['output']>;
};

/** aggregated selection of "links_photos" */
export type Links_Photos_Aggregate = {
  __typename?: 'links_photos_aggregate';
  aggregate?: Maybe<Links_Photos_Aggregate_Fields>;
  nodes: Array<Links_Photos>;
};

export type Links_Photos_Aggregate_Bool_Exp = {
  count?: InputMaybe<Links_Photos_Aggregate_Bool_Exp_Count>;
};

export type Links_Photos_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Links_Photos_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Links_Photos_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "links_photos" */
export type Links_Photos_Aggregate_Fields = {
  __typename?: 'links_photos_aggregate_fields';
  avg?: Maybe<Links_Photos_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Links_Photos_Max_Fields>;
  min?: Maybe<Links_Photos_Min_Fields>;
  stddev?: Maybe<Links_Photos_Stddev_Fields>;
  stddev_pop?: Maybe<Links_Photos_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Links_Photos_Stddev_Samp_Fields>;
  sum?: Maybe<Links_Photos_Sum_Fields>;
  var_pop?: Maybe<Links_Photos_Var_Pop_Fields>;
  var_samp?: Maybe<Links_Photos_Var_Samp_Fields>;
  variance?: Maybe<Links_Photos_Variance_Fields>;
};


/** aggregate fields of "links_photos" */
export type Links_Photos_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Links_Photos_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "links_photos" */
export type Links_Photos_Aggregate_Order_By = {
  avg?: InputMaybe<Links_Photos_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Links_Photos_Max_Order_By>;
  min?: InputMaybe<Links_Photos_Min_Order_By>;
  stddev?: InputMaybe<Links_Photos_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Links_Photos_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Links_Photos_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Links_Photos_Sum_Order_By>;
  var_pop?: InputMaybe<Links_Photos_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Links_Photos_Var_Samp_Order_By>;
  variance?: InputMaybe<Links_Photos_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "links_photos" */
export type Links_Photos_Arr_Rel_Insert_Input = {
  data: Array<Links_Photos_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Links_Photos_On_Conflict>;
};

/** aggregate avg on columns */
export type Links_Photos_Avg_Fields = {
  __typename?: 'links_photos_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "links_photos" */
export type Links_Photos_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "links_photos". All fields are combined with a logical 'AND'. */
export type Links_Photos_Bool_Exp = {
  _and?: InputMaybe<Array<Links_Photos_Bool_Exp>>;
  _not?: InputMaybe<Links_Photos_Bool_Exp>;
  _or?: InputMaybe<Array<Links_Photos_Bool_Exp>>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  link?: InputMaybe<Links_Bool_Exp>;
  link_id?: InputMaybe<Uuid_Comparison_Exp>;
  object_id?: InputMaybe<Uuid_Comparison_Exp>;
  sort?: InputMaybe<Smallint_Comparison_Exp>;
};

/** unique or primary key constraints on table "links_photos" */
export enum Links_Photos_Constraint {
  /** unique or primary key constraint on columns "id" */
  LinksPhotosPkey = 'links_photos_pkey'
}

/** input type for incrementing numeric columns in table "links_photos" */
export type Links_Photos_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  sort?: InputMaybe<Scalars['smallint']['input']>;
};

/** input type for inserting data into table "links_photos" */
export type Links_Photos_Insert_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  link?: InputMaybe<Links_Obj_Rel_Insert_Input>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  object_id?: InputMaybe<Scalars['uuid']['input']>;
  sort?: InputMaybe<Scalars['smallint']['input']>;
};

/** aggregate max on columns */
export type Links_Photos_Max_Fields = {
  __typename?: 'links_photos_max_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  object_id?: Maybe<Scalars['uuid']['output']>;
  sort?: Maybe<Scalars['smallint']['output']>;
};

/** order by max() on columns of table "links_photos" */
export type Links_Photos_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  link_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Links_Photos_Min_Fields = {
  __typename?: 'links_photos_min_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  object_id?: Maybe<Scalars['uuid']['output']>;
  sort?: Maybe<Scalars['smallint']['output']>;
};

/** order by min() on columns of table "links_photos" */
export type Links_Photos_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  link_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "links_photos" */
export type Links_Photos_Mutation_Response = {
  __typename?: 'links_photos_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Links_Photos>;
};

/** on_conflict condition type for table "links_photos" */
export type Links_Photos_On_Conflict = {
  constraint: Links_Photos_Constraint;
  update_columns?: Array<Links_Photos_Update_Column>;
  where?: InputMaybe<Links_Photos_Bool_Exp>;
};

/** Ordering options when selecting data from "links_photos". */
export type Links_Photos_Order_By = {
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Links_Order_By>;
  link_id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** primary key columns input for table: links_photos */
export type Links_Photos_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "links_photos" */
export enum Links_Photos_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LinkId = 'link_id',
  /** column name */
  ObjectId = 'object_id',
  /** column name */
  Sort = 'sort'
}

/** input type for updating data in table "links_photos" */
export type Links_Photos_Set_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  object_id?: InputMaybe<Scalars['uuid']['input']>;
  sort?: InputMaybe<Scalars['smallint']['input']>;
};

/** aggregate stddev on columns */
export type Links_Photos_Stddev_Fields = {
  __typename?: 'links_photos_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "links_photos" */
export type Links_Photos_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Links_Photos_Stddev_Pop_Fields = {
  __typename?: 'links_photos_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "links_photos" */
export type Links_Photos_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Links_Photos_Stddev_Samp_Fields = {
  __typename?: 'links_photos_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "links_photos" */
export type Links_Photos_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "links_photos" */
export type Links_Photos_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Links_Photos_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Links_Photos_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  object_id?: InputMaybe<Scalars['uuid']['input']>;
  sort?: InputMaybe<Scalars['smallint']['input']>;
};

/** aggregate sum on columns */
export type Links_Photos_Sum_Fields = {
  __typename?: 'links_photos_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  sort?: Maybe<Scalars['smallint']['output']>;
};

/** order by sum() on columns of table "links_photos" */
export type Links_Photos_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** update columns of table "links_photos" */
export enum Links_Photos_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LinkId = 'link_id',
  /** column name */
  ObjectId = 'object_id',
  /** column name */
  Sort = 'sort'
}

export type Links_Photos_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Links_Photos_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Links_Photos_Set_Input>;
  /** filter the rows which have to be updated */
  where: Links_Photos_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Links_Photos_Var_Pop_Fields = {
  __typename?: 'links_photos_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "links_photos" */
export type Links_Photos_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Links_Photos_Var_Samp_Fields = {
  __typename?: 'links_photos_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "links_photos" */
export type Links_Photos_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Links_Photos_Variance_Fields = {
  __typename?: 'links_photos_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "links_photos" */
export type Links_Photos_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** primary key columns input for table: links */
export type Links_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Links_Prepend_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
  parameters?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "links" */
export enum Links_Select_Column {
  /** column name */
  Clicks = 'clicks',
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DateEnd = 'date_end',
  /** column name */
  DateStart = 'date_start',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Name = 'name',
  /** column name */
  OgDescription = 'og_description',
  /** column name */
  OgImage = 'og_image',
  /** column name */
  OgTitle = 'og_title',
  /** column name */
  Parameters = 'parameters',
  /** column name */
  ParentLink = 'parent_link',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type',
  /** column name */
  Url = 'url',
  /** column name */
  User = 'user'
}

/** input type for updating data in table "links" */
export type Links_Set_Input = {
  clicks?: InputMaybe<Scalars['bigint']['input']>;
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  date_end?: InputMaybe<Scalars['timestamptz']['input']>;
  date_start?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  og_description?: InputMaybe<Scalars['String']['input']>;
  og_image?: InputMaybe<Scalars['String']['input']>;
  og_title?: InputMaybe<Scalars['String']['input']>;
  parameters?: InputMaybe<Scalars['jsonb']['input']>;
  parent_link?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Links_Stddev_Fields = {
  __typename?: 'links_stddev_fields';
  clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "links" */
export type Links_Stddev_Order_By = {
  clicks?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Links_Stddev_Pop_Fields = {
  __typename?: 'links_stddev_pop_fields';
  clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "links" */
export type Links_Stddev_Pop_Order_By = {
  clicks?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Links_Stddev_Samp_Fields = {
  __typename?: 'links_stddev_samp_fields';
  clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "links" */
export type Links_Stddev_Samp_Order_By = {
  clicks?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "links" */
export type Links_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Links_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Links_Stream_Cursor_Value_Input = {
  clicks?: InputMaybe<Scalars['bigint']['input']>;
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  date_end?: InputMaybe<Scalars['timestamptz']['input']>;
  date_start?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  og_description?: InputMaybe<Scalars['String']['input']>;
  og_image?: InputMaybe<Scalars['String']['input']>;
  og_title?: InputMaybe<Scalars['String']['input']>;
  parameters?: InputMaybe<Scalars['jsonb']['input']>;
  parent_link?: InputMaybe<Scalars['uuid']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Links_Sum_Fields = {
  __typename?: 'links_sum_fields';
  clicks?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "links" */
export type Links_Sum_Order_By = {
  clicks?: InputMaybe<Order_By>;
};

/** columns and relationships of "links_tags" */
export type Links_Tags = {
  __typename?: 'links_tags';
  id: Scalars['bigint']['output'];
  /** An object relationship */
  link?: Maybe<Links>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  tag?: Maybe<Tags>;
  tag_id?: Maybe<Scalars['bigint']['output']>;
};

/** aggregated selection of "links_tags" */
export type Links_Tags_Aggregate = {
  __typename?: 'links_tags_aggregate';
  aggregate?: Maybe<Links_Tags_Aggregate_Fields>;
  nodes: Array<Links_Tags>;
};

export type Links_Tags_Aggregate_Bool_Exp = {
  count?: InputMaybe<Links_Tags_Aggregate_Bool_Exp_Count>;
};

export type Links_Tags_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Links_Tags_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Links_Tags_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "links_tags" */
export type Links_Tags_Aggregate_Fields = {
  __typename?: 'links_tags_aggregate_fields';
  avg?: Maybe<Links_Tags_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Links_Tags_Max_Fields>;
  min?: Maybe<Links_Tags_Min_Fields>;
  stddev?: Maybe<Links_Tags_Stddev_Fields>;
  stddev_pop?: Maybe<Links_Tags_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Links_Tags_Stddev_Samp_Fields>;
  sum?: Maybe<Links_Tags_Sum_Fields>;
  var_pop?: Maybe<Links_Tags_Var_Pop_Fields>;
  var_samp?: Maybe<Links_Tags_Var_Samp_Fields>;
  variance?: Maybe<Links_Tags_Variance_Fields>;
};


/** aggregate fields of "links_tags" */
export type Links_Tags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Links_Tags_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "links_tags" */
export type Links_Tags_Aggregate_Order_By = {
  avg?: InputMaybe<Links_Tags_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Links_Tags_Max_Order_By>;
  min?: InputMaybe<Links_Tags_Min_Order_By>;
  stddev?: InputMaybe<Links_Tags_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Links_Tags_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Links_Tags_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Links_Tags_Sum_Order_By>;
  var_pop?: InputMaybe<Links_Tags_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Links_Tags_Var_Samp_Order_By>;
  variance?: InputMaybe<Links_Tags_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "links_tags" */
export type Links_Tags_Arr_Rel_Insert_Input = {
  data: Array<Links_Tags_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Links_Tags_On_Conflict>;
};

/** aggregate avg on columns */
export type Links_Tags_Avg_Fields = {
  __typename?: 'links_tags_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tag_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "links_tags" */
export type Links_Tags_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "links_tags". All fields are combined with a logical 'AND'. */
export type Links_Tags_Bool_Exp = {
  _and?: InputMaybe<Array<Links_Tags_Bool_Exp>>;
  _not?: InputMaybe<Links_Tags_Bool_Exp>;
  _or?: InputMaybe<Array<Links_Tags_Bool_Exp>>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  link?: InputMaybe<Links_Bool_Exp>;
  link_id?: InputMaybe<Uuid_Comparison_Exp>;
  tag?: InputMaybe<Tags_Bool_Exp>;
  tag_id?: InputMaybe<Bigint_Comparison_Exp>;
};

/** unique or primary key constraints on table "links_tags" */
export enum Links_Tags_Constraint {
  /** unique or primary key constraint on columns "id" */
  LinksTagsPkey = 'links_tags_pkey'
}

/** input type for incrementing numeric columns in table "links_tags" */
export type Links_Tags_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  tag_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "links_tags" */
export type Links_Tags_Insert_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  link?: InputMaybe<Links_Obj_Rel_Insert_Input>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  tag?: InputMaybe<Tags_Obj_Rel_Insert_Input>;
  tag_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate max on columns */
export type Links_Tags_Max_Fields = {
  __typename?: 'links_tags_max_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  tag_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by max() on columns of table "links_tags" */
export type Links_Tags_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  link_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Links_Tags_Min_Fields = {
  __typename?: 'links_tags_min_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  tag_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by min() on columns of table "links_tags" */
export type Links_Tags_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  link_id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "links_tags" */
export type Links_Tags_Mutation_Response = {
  __typename?: 'links_tags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Links_Tags>;
};

/** on_conflict condition type for table "links_tags" */
export type Links_Tags_On_Conflict = {
  constraint: Links_Tags_Constraint;
  update_columns?: Array<Links_Tags_Update_Column>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};

/** Ordering options when selecting data from "links_tags". */
export type Links_Tags_Order_By = {
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Links_Order_By>;
  link_id?: InputMaybe<Order_By>;
  tag?: InputMaybe<Tags_Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: links_tags */
export type Links_Tags_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "links_tags" */
export enum Links_Tags_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LinkId = 'link_id',
  /** column name */
  TagId = 'tag_id'
}

/** input type for updating data in table "links_tags" */
export type Links_Tags_Set_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  tag_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate stddev on columns */
export type Links_Tags_Stddev_Fields = {
  __typename?: 'links_tags_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tag_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "links_tags" */
export type Links_Tags_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Links_Tags_Stddev_Pop_Fields = {
  __typename?: 'links_tags_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tag_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "links_tags" */
export type Links_Tags_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Links_Tags_Stddev_Samp_Fields = {
  __typename?: 'links_tags_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tag_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "links_tags" */
export type Links_Tags_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "links_tags" */
export type Links_Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Links_Tags_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Links_Tags_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  tag_id?: InputMaybe<Scalars['bigint']['input']>;
};

/** aggregate sum on columns */
export type Links_Tags_Sum_Fields = {
  __typename?: 'links_tags_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  tag_id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "links_tags" */
export type Links_Tags_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** update columns of table "links_tags" */
export enum Links_Tags_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LinkId = 'link_id',
  /** column name */
  TagId = 'tag_id'
}

export type Links_Tags_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Links_Tags_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Links_Tags_Set_Input>;
  /** filter the rows which have to be updated */
  where: Links_Tags_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Links_Tags_Var_Pop_Fields = {
  __typename?: 'links_tags_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tag_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "links_tags" */
export type Links_Tags_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Links_Tags_Var_Samp_Fields = {
  __typename?: 'links_tags_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tag_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "links_tags" */
export type Links_Tags_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Links_Tags_Variance_Fields = {
  __typename?: 'links_tags_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  tag_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "links_tags" */
export type Links_Tags_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  tag_id?: InputMaybe<Order_By>;
};

/** update columns of table "links" */
export enum Links_Update_Column {
  /** column name */
  Clicks = 'clicks',
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DateEnd = 'date_end',
  /** column name */
  DateStart = 'date_start',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  Name = 'name',
  /** column name */
  OgDescription = 'og_description',
  /** column name */
  OgImage = 'og_image',
  /** column name */
  OgTitle = 'og_title',
  /** column name */
  Parameters = 'parameters',
  /** column name */
  ParentLink = 'parent_link',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type',
  /** column name */
  Url = 'url',
  /** column name */
  User = 'user'
}

export type Links_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Links_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Links_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Links_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Links_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Links_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Links_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Links_Set_Input>;
  /** filter the rows which have to be updated */
  where: Links_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Links_Var_Pop_Fields = {
  __typename?: 'links_var_pop_fields';
  clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "links" */
export type Links_Var_Pop_Order_By = {
  clicks?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Links_Var_Samp_Fields = {
  __typename?: 'links_var_samp_fields';
  clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "links" */
export type Links_Var_Samp_Order_By = {
  clicks?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Links_Variance_Fields = {
  __typename?: 'links_variance_fields';
  clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "links" */
export type Links_Variance_Order_By = {
  clicks?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "genres" */
  delete_genres?: Maybe<Genres_Mutation_Response>;
  /** delete single row from the table: "genres" */
  delete_genres_by_pk?: Maybe<Genres>;
  /** delete data from the table: "links" */
  delete_links?: Maybe<Links_Mutation_Response>;
  /** delete single row from the table: "links" */
  delete_links_by_pk?: Maybe<Links>;
  /** delete data from the table: "links_photos" */
  delete_links_photos?: Maybe<Links_Photos_Mutation_Response>;
  /** delete single row from the table: "links_photos" */
  delete_links_photos_by_pk?: Maybe<Links_Photos>;
  /** delete data from the table: "links_tags" */
  delete_links_tags?: Maybe<Links_Tags_Mutation_Response>;
  /** delete single row from the table: "links_tags" */
  delete_links_tags_by_pk?: Maybe<Links_Tags>;
  /** delete data from the table: "pages" */
  delete_pages?: Maybe<Pages_Mutation_Response>;
  /** delete single row from the table: "pages" */
  delete_pages_by_pk?: Maybe<Pages>;
  /** delete data from the table: "styles" */
  delete_styles?: Maybe<Styles_Mutation_Response>;
  /** delete single row from the table: "styles" */
  delete_styles_by_pk?: Maybe<Styles>;
  /** delete data from the table: "tags" */
  delete_tags?: Maybe<Tags_Mutation_Response>;
  /** delete single row from the table: "tags" */
  delete_tags_by_pk?: Maybe<Tags>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "users_genres" */
  delete_users_genres?: Maybe<Users_Genres_Mutation_Response>;
  /** delete single row from the table: "users_genres" */
  delete_users_genres_by_pk?: Maybe<Users_Genres>;
  /** delete data from the table: "widgets" */
  delete_widgets?: Maybe<Widgets_Mutation_Response>;
  /** delete single row from the table: "widgets" */
  delete_widgets_by_pk?: Maybe<Widgets>;
  /** delete data from the table: "widgets_links" */
  delete_widgets_links?: Maybe<Widgets_Links_Mutation_Response>;
  /** delete single row from the table: "widgets_links" */
  delete_widgets_links_by_pk?: Maybe<Widgets_Links>;
  /** insert data into the table: "genres" */
  insert_genres?: Maybe<Genres_Mutation_Response>;
  /** insert a single row into the table: "genres" */
  insert_genres_one?: Maybe<Genres>;
  /** insert data into the table: "links" */
  insert_links?: Maybe<Links_Mutation_Response>;
  /** insert a single row into the table: "links" */
  insert_links_one?: Maybe<Links>;
  /** insert data into the table: "links_photos" */
  insert_links_photos?: Maybe<Links_Photos_Mutation_Response>;
  /** insert a single row into the table: "links_photos" */
  insert_links_photos_one?: Maybe<Links_Photos>;
  /** insert data into the table: "links_tags" */
  insert_links_tags?: Maybe<Links_Tags_Mutation_Response>;
  /** insert a single row into the table: "links_tags" */
  insert_links_tags_one?: Maybe<Links_Tags>;
  /** insert data into the table: "pages" */
  insert_pages?: Maybe<Pages_Mutation_Response>;
  /** insert a single row into the table: "pages" */
  insert_pages_one?: Maybe<Pages>;
  /** insert data into the table: "styles" */
  insert_styles?: Maybe<Styles_Mutation_Response>;
  /** insert a single row into the table: "styles" */
  insert_styles_one?: Maybe<Styles>;
  /** insert data into the table: "tags" */
  insert_tags?: Maybe<Tags_Mutation_Response>;
  /** insert a single row into the table: "tags" */
  insert_tags_one?: Maybe<Tags>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert data into the table: "users_genres" */
  insert_users_genres?: Maybe<Users_Genres_Mutation_Response>;
  /** insert a single row into the table: "users_genres" */
  insert_users_genres_one?: Maybe<Users_Genres>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "widgets" */
  insert_widgets?: Maybe<Widgets_Mutation_Response>;
  /** insert data into the table: "widgets_links" */
  insert_widgets_links?: Maybe<Widgets_Links_Mutation_Response>;
  /** insert a single row into the table: "widgets_links" */
  insert_widgets_links_one?: Maybe<Widgets_Links>;
  /** insert a single row into the table: "widgets" */
  insert_widgets_one?: Maybe<Widgets>;
  /** update data of the table: "genres" */
  update_genres?: Maybe<Genres_Mutation_Response>;
  /** update single row of the table: "genres" */
  update_genres_by_pk?: Maybe<Genres>;
  /** update multiples rows of table: "genres" */
  update_genres_many?: Maybe<Array<Maybe<Genres_Mutation_Response>>>;
  /** update data of the table: "links" */
  update_links?: Maybe<Links_Mutation_Response>;
  /** update single row of the table: "links" */
  update_links_by_pk?: Maybe<Links>;
  /** update multiples rows of table: "links" */
  update_links_many?: Maybe<Array<Maybe<Links_Mutation_Response>>>;
  /** update data of the table: "links_photos" */
  update_links_photos?: Maybe<Links_Photos_Mutation_Response>;
  /** update single row of the table: "links_photos" */
  update_links_photos_by_pk?: Maybe<Links_Photos>;
  /** update multiples rows of table: "links_photos" */
  update_links_photos_many?: Maybe<Array<Maybe<Links_Photos_Mutation_Response>>>;
  /** update data of the table: "links_tags" */
  update_links_tags?: Maybe<Links_Tags_Mutation_Response>;
  /** update single row of the table: "links_tags" */
  update_links_tags_by_pk?: Maybe<Links_Tags>;
  /** update multiples rows of table: "links_tags" */
  update_links_tags_many?: Maybe<Array<Maybe<Links_Tags_Mutation_Response>>>;
  /** update data of the table: "pages" */
  update_pages?: Maybe<Pages_Mutation_Response>;
  /** update single row of the table: "pages" */
  update_pages_by_pk?: Maybe<Pages>;
  /** update multiples rows of table: "pages" */
  update_pages_many?: Maybe<Array<Maybe<Pages_Mutation_Response>>>;
  /** update data of the table: "styles" */
  update_styles?: Maybe<Styles_Mutation_Response>;
  /** update single row of the table: "styles" */
  update_styles_by_pk?: Maybe<Styles>;
  /** update multiples rows of table: "styles" */
  update_styles_many?: Maybe<Array<Maybe<Styles_Mutation_Response>>>;
  /** update data of the table: "tags" */
  update_tags?: Maybe<Tags_Mutation_Response>;
  /** update single row of the table: "tags" */
  update_tags_by_pk?: Maybe<Tags>;
  /** update multiples rows of table: "tags" */
  update_tags_many?: Maybe<Array<Maybe<Tags_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update data of the table: "users_genres" */
  update_users_genres?: Maybe<Users_Genres_Mutation_Response>;
  /** update single row of the table: "users_genres" */
  update_users_genres_by_pk?: Maybe<Users_Genres>;
  /** update multiples rows of table: "users_genres" */
  update_users_genres_many?: Maybe<Array<Maybe<Users_Genres_Mutation_Response>>>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  /** update data of the table: "widgets" */
  update_widgets?: Maybe<Widgets_Mutation_Response>;
  /** update single row of the table: "widgets" */
  update_widgets_by_pk?: Maybe<Widgets>;
  /** update data of the table: "widgets_links" */
  update_widgets_links?: Maybe<Widgets_Links_Mutation_Response>;
  /** update single row of the table: "widgets_links" */
  update_widgets_links_by_pk?: Maybe<Widgets_Links>;
  /** update multiples rows of table: "widgets_links" */
  update_widgets_links_many?: Maybe<Array<Maybe<Widgets_Links_Mutation_Response>>>;
  /** update multiples rows of table: "widgets" */
  update_widgets_many?: Maybe<Array<Maybe<Widgets_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_GenresArgs = {
  where: Genres_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Genres_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_LinksArgs = {
  where: Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Links_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Links_PhotosArgs = {
  where: Links_Photos_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Links_Photos_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Links_TagsArgs = {
  where: Links_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Links_Tags_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_PagesArgs = {
  where: Pages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Pages_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_StylesArgs = {
  where: Styles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Styles_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TagsArgs = {
  where: Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tags_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Users_GenresArgs = {
  where: Users_Genres_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_Genres_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_WidgetsArgs = {
  where: Widgets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Widgets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Widgets_LinksArgs = {
  where: Widgets_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Widgets_Links_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootInsert_GenresArgs = {
  objects: Array<Genres_Insert_Input>;
  on_conflict?: InputMaybe<Genres_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Genres_OneArgs = {
  object: Genres_Insert_Input;
  on_conflict?: InputMaybe<Genres_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_LinksArgs = {
  objects: Array<Links_Insert_Input>;
  on_conflict?: InputMaybe<Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Links_OneArgs = {
  object: Links_Insert_Input;
  on_conflict?: InputMaybe<Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Links_PhotosArgs = {
  objects: Array<Links_Photos_Insert_Input>;
  on_conflict?: InputMaybe<Links_Photos_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Links_Photos_OneArgs = {
  object: Links_Photos_Insert_Input;
  on_conflict?: InputMaybe<Links_Photos_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Links_TagsArgs = {
  objects: Array<Links_Tags_Insert_Input>;
  on_conflict?: InputMaybe<Links_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Links_Tags_OneArgs = {
  object: Links_Tags_Insert_Input;
  on_conflict?: InputMaybe<Links_Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PagesArgs = {
  objects: Array<Pages_Insert_Input>;
  on_conflict?: InputMaybe<Pages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pages_OneArgs = {
  object: Pages_Insert_Input;
  on_conflict?: InputMaybe<Pages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_StylesArgs = {
  objects: Array<Styles_Insert_Input>;
  on_conflict?: InputMaybe<Styles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Styles_OneArgs = {
  object: Styles_Insert_Input;
  on_conflict?: InputMaybe<Styles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TagsArgs = {
  objects: Array<Tags_Insert_Input>;
  on_conflict?: InputMaybe<Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tags_OneArgs = {
  object: Tags_Insert_Input;
  on_conflict?: InputMaybe<Tags_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_GenresArgs = {
  objects: Array<Users_Genres_Insert_Input>;
  on_conflict?: InputMaybe<Users_Genres_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_Genres_OneArgs = {
  object: Users_Genres_Insert_Input;
  on_conflict?: InputMaybe<Users_Genres_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WidgetsArgs = {
  objects: Array<Widgets_Insert_Input>;
  on_conflict?: InputMaybe<Widgets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Widgets_LinksArgs = {
  objects: Array<Widgets_Links_Insert_Input>;
  on_conflict?: InputMaybe<Widgets_Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Widgets_Links_OneArgs = {
  object: Widgets_Links_Insert_Input;
  on_conflict?: InputMaybe<Widgets_Links_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Widgets_OneArgs = {
  object: Widgets_Insert_Input;
  on_conflict?: InputMaybe<Widgets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_GenresArgs = {
  _inc?: InputMaybe<Genres_Inc_Input>;
  _set?: InputMaybe<Genres_Set_Input>;
  where: Genres_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Genres_By_PkArgs = {
  _inc?: InputMaybe<Genres_Inc_Input>;
  _set?: InputMaybe<Genres_Set_Input>;
  pk_columns: Genres_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Genres_ManyArgs = {
  updates: Array<Genres_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_LinksArgs = {
  _append?: InputMaybe<Links_Append_Input>;
  _delete_at_path?: InputMaybe<Links_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Links_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Links_Delete_Key_Input>;
  _inc?: InputMaybe<Links_Inc_Input>;
  _prepend?: InputMaybe<Links_Prepend_Input>;
  _set?: InputMaybe<Links_Set_Input>;
  where: Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Links_By_PkArgs = {
  _append?: InputMaybe<Links_Append_Input>;
  _delete_at_path?: InputMaybe<Links_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Links_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Links_Delete_Key_Input>;
  _inc?: InputMaybe<Links_Inc_Input>;
  _prepend?: InputMaybe<Links_Prepend_Input>;
  _set?: InputMaybe<Links_Set_Input>;
  pk_columns: Links_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Links_ManyArgs = {
  updates: Array<Links_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Links_PhotosArgs = {
  _inc?: InputMaybe<Links_Photos_Inc_Input>;
  _set?: InputMaybe<Links_Photos_Set_Input>;
  where: Links_Photos_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Links_Photos_By_PkArgs = {
  _inc?: InputMaybe<Links_Photos_Inc_Input>;
  _set?: InputMaybe<Links_Photos_Set_Input>;
  pk_columns: Links_Photos_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Links_Photos_ManyArgs = {
  updates: Array<Links_Photos_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Links_TagsArgs = {
  _inc?: InputMaybe<Links_Tags_Inc_Input>;
  _set?: InputMaybe<Links_Tags_Set_Input>;
  where: Links_Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Links_Tags_By_PkArgs = {
  _inc?: InputMaybe<Links_Tags_Inc_Input>;
  _set?: InputMaybe<Links_Tags_Set_Input>;
  pk_columns: Links_Tags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Links_Tags_ManyArgs = {
  updates: Array<Links_Tags_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PagesArgs = {
  _set?: InputMaybe<Pages_Set_Input>;
  where: Pages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Pages_By_PkArgs = {
  _set?: InputMaybe<Pages_Set_Input>;
  pk_columns: Pages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Pages_ManyArgs = {
  updates: Array<Pages_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_StylesArgs = {
  _inc?: InputMaybe<Styles_Inc_Input>;
  _set?: InputMaybe<Styles_Set_Input>;
  where: Styles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Styles_By_PkArgs = {
  _inc?: InputMaybe<Styles_Inc_Input>;
  _set?: InputMaybe<Styles_Set_Input>;
  pk_columns: Styles_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Styles_ManyArgs = {
  updates: Array<Styles_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TagsArgs = {
  _inc?: InputMaybe<Tags_Inc_Input>;
  _set?: InputMaybe<Tags_Set_Input>;
  where: Tags_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tags_By_PkArgs = {
  _inc?: InputMaybe<Tags_Inc_Input>;
  _set?: InputMaybe<Tags_Set_Input>;
  pk_columns: Tags_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Tags_ManyArgs = {
  updates: Array<Tags_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _append?: InputMaybe<Users_Append_Input>;
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  _prepend?: InputMaybe<Users_Prepend_Input>;
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_GenresArgs = {
  _inc?: InputMaybe<Users_Genres_Inc_Input>;
  _set?: InputMaybe<Users_Genres_Set_Input>;
  where: Users_Genres_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_Genres_By_PkArgs = {
  _inc?: InputMaybe<Users_Genres_Inc_Input>;
  _set?: InputMaybe<Users_Genres_Set_Input>;
  pk_columns: Users_Genres_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_Genres_ManyArgs = {
  updates: Array<Users_Genres_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_WidgetsArgs = {
  _append?: InputMaybe<Widgets_Append_Input>;
  _delete_at_path?: InputMaybe<Widgets_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Widgets_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Widgets_Delete_Key_Input>;
  _inc?: InputMaybe<Widgets_Inc_Input>;
  _prepend?: InputMaybe<Widgets_Prepend_Input>;
  _set?: InputMaybe<Widgets_Set_Input>;
  where: Widgets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Widgets_By_PkArgs = {
  _append?: InputMaybe<Widgets_Append_Input>;
  _delete_at_path?: InputMaybe<Widgets_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Widgets_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Widgets_Delete_Key_Input>;
  _inc?: InputMaybe<Widgets_Inc_Input>;
  _prepend?: InputMaybe<Widgets_Prepend_Input>;
  _set?: InputMaybe<Widgets_Set_Input>;
  pk_columns: Widgets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Widgets_LinksArgs = {
  _inc?: InputMaybe<Widgets_Links_Inc_Input>;
  _set?: InputMaybe<Widgets_Links_Set_Input>;
  where: Widgets_Links_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Widgets_Links_By_PkArgs = {
  _inc?: InputMaybe<Widgets_Links_Inc_Input>;
  _set?: InputMaybe<Widgets_Links_Set_Input>;
  pk_columns: Widgets_Links_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Widgets_Links_ManyArgs = {
  updates: Array<Widgets_Links_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Widgets_ManyArgs = {
  updates: Array<Widgets_Updates>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "pages" */
export type Pages = {
  __typename?: 'pages';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  is_home?: Maybe<Scalars['Boolean']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  userByUser?: Maybe<Users>;
};

/** aggregated selection of "pages" */
export type Pages_Aggregate = {
  __typename?: 'pages_aggregate';
  aggregate?: Maybe<Pages_Aggregate_Fields>;
  nodes: Array<Pages>;
};

export type Pages_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Pages_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Pages_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Pages_Aggregate_Bool_Exp_Count>;
};

export type Pages_Aggregate_Bool_Exp_Bool_And = {
  arguments: Pages_Select_Column_Pages_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Pages_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Pages_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Pages_Select_Column_Pages_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Pages_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Pages_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Pages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Pages_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "pages" */
export type Pages_Aggregate_Fields = {
  __typename?: 'pages_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Pages_Max_Fields>;
  min?: Maybe<Pages_Min_Fields>;
};


/** aggregate fields of "pages" */
export type Pages_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Pages_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "pages" */
export type Pages_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Pages_Max_Order_By>;
  min?: InputMaybe<Pages_Min_Order_By>;
};

/** input type for inserting array relation for remote table "pages" */
export type Pages_Arr_Rel_Insert_Input = {
  data: Array<Pages_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Pages_On_Conflict>;
};

/** Boolean expression to filter rows from the table "pages". All fields are combined with a logical 'AND'. */
export type Pages_Bool_Exp = {
  _and?: InputMaybe<Array<Pages_Bool_Exp>>;
  _not?: InputMaybe<Pages_Bool_Exp>;
  _or?: InputMaybe<Array<Pages_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_home?: InputMaybe<Boolean_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Uuid_Comparison_Exp>;
  userByUser?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "pages" */
export enum Pages_Constraint {
  /** unique or primary key constraint on columns "id" */
  PagesPkey = 'pages_pkey'
}

/** input type for inserting data into table "pages" */
export type Pages_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_home?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
  userByUser?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Pages_Max_Fields = {
  __typename?: 'pages_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "pages" */
export type Pages_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Pages_Min_Fields = {
  __typename?: 'pages_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "pages" */
export type Pages_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "pages" */
export type Pages_Mutation_Response = {
  __typename?: 'pages_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Pages>;
};

/** on_conflict condition type for table "pages" */
export type Pages_On_Conflict = {
  constraint: Pages_Constraint;
  update_columns?: Array<Pages_Update_Column>;
  where?: InputMaybe<Pages_Bool_Exp>;
};

/** Ordering options when selecting data from "pages". */
export type Pages_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_home?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
  userByUser?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: pages */
export type Pages_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "pages" */
export enum Pages_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsHome = 'is_home',
  /** column name */
  Key = 'key',
  /** column name */
  User = 'user'
}

/** select "pages_aggregate_bool_exp_bool_and_arguments_columns" columns of table "pages" */
export enum Pages_Select_Column_Pages_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsHome = 'is_home'
}

/** select "pages_aggregate_bool_exp_bool_or_arguments_columns" columns of table "pages" */
export enum Pages_Select_Column_Pages_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsHome = 'is_home'
}

/** input type for updating data in table "pages" */
export type Pages_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_home?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "pages" */
export type Pages_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Pages_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Pages_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_home?: InputMaybe<Scalars['Boolean']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "pages" */
export enum Pages_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsHome = 'is_home',
  /** column name */
  Key = 'key',
  /** column name */
  User = 'user'
}

export type Pages_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Pages_Set_Input>;
  /** filter the rows which have to be updated */
  where: Pages_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "genres" */
  genres: Array<Genres>;
  /** fetch aggregated fields from the table: "genres" */
  genres_aggregate: Genres_Aggregate;
  /** fetch data from the table: "genres" using primary key columns */
  genres_by_pk?: Maybe<Genres>;
  /** An array relationship */
  links: Array<Links>;
  /** An aggregate relationship */
  links_aggregate: Links_Aggregate;
  /** fetch data from the table: "links" using primary key columns */
  links_by_pk?: Maybe<Links>;
  /** An array relationship */
  links_photos: Array<Links_Photos>;
  /** An aggregate relationship */
  links_photos_aggregate: Links_Photos_Aggregate;
  /** fetch data from the table: "links_photos" using primary key columns */
  links_photos_by_pk?: Maybe<Links_Photos>;
  /** An array relationship */
  links_tags: Array<Links_Tags>;
  /** An aggregate relationship */
  links_tags_aggregate: Links_Tags_Aggregate;
  /** fetch data from the table: "links_tags" using primary key columns */
  links_tags_by_pk?: Maybe<Links_Tags>;
  /** An array relationship */
  pages: Array<Pages>;
  /** An aggregate relationship */
  pages_aggregate: Pages_Aggregate;
  /** fetch data from the table: "pages" using primary key columns */
  pages_by_pk?: Maybe<Pages>;
  /** fetch data from the table: "styles" */
  styles: Array<Styles>;
  /** fetch aggregated fields from the table: "styles" */
  styles_aggregate: Styles_Aggregate;
  /** fetch data from the table: "styles" using primary key columns */
  styles_by_pk?: Maybe<Styles>;
  /** An array relationship */
  tags: Array<Tags>;
  /** An aggregate relationship */
  tags_aggregate: Tags_Aggregate;
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** An array relationship */
  users_genres: Array<Users_Genres>;
  /** An aggregate relationship */
  users_genres_aggregate: Users_Genres_Aggregate;
  /** fetch data from the table: "users_genres" using primary key columns */
  users_genres_by_pk?: Maybe<Users_Genres>;
  /** An array relationship */
  widgets: Array<Widgets>;
  /** An aggregate relationship */
  widgets_aggregate: Widgets_Aggregate;
  /** fetch data from the table: "widgets" using primary key columns */
  widgets_by_pk?: Maybe<Widgets>;
  /** An array relationship */
  widgets_links: Array<Widgets_Links>;
  /** An aggregate relationship */
  widgets_links_aggregate: Widgets_Links_Aggregate;
  /** fetch data from the table: "widgets_links" using primary key columns */
  widgets_links_by_pk?: Maybe<Widgets_Links>;
};


export type Query_RootGenresArgs = {
  distinct_on?: InputMaybe<Array<Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Genres_Order_By>>;
  where?: InputMaybe<Genres_Bool_Exp>;
};


export type Query_RootGenres_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Genres_Order_By>>;
  where?: InputMaybe<Genres_Bool_Exp>;
};


export type Query_RootGenres_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootLinksArgs = {
  distinct_on?: InputMaybe<Array<Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Order_By>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


export type Query_RootLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Order_By>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


export type Query_RootLinks_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootLinks_PhotosArgs = {
  distinct_on?: InputMaybe<Array<Links_Photos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Photos_Order_By>>;
  where?: InputMaybe<Links_Photos_Bool_Exp>;
};


export type Query_RootLinks_Photos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Photos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Photos_Order_By>>;
  where?: InputMaybe<Links_Photos_Bool_Exp>;
};


export type Query_RootLinks_Photos_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootLinks_TagsArgs = {
  distinct_on?: InputMaybe<Array<Links_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Tags_Order_By>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};


export type Query_RootLinks_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Tags_Order_By>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};


export type Query_RootLinks_Tags_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootPagesArgs = {
  distinct_on?: InputMaybe<Array<Pages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pages_Order_By>>;
  where?: InputMaybe<Pages_Bool_Exp>;
};


export type Query_RootPages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pages_Order_By>>;
  where?: InputMaybe<Pages_Bool_Exp>;
};


export type Query_RootPages_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootStylesArgs = {
  distinct_on?: InputMaybe<Array<Styles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Styles_Order_By>>;
  where?: InputMaybe<Styles_Bool_Exp>;
};


export type Query_RootStyles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Styles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Styles_Order_By>>;
  where?: InputMaybe<Styles_Bool_Exp>;
};


export type Query_RootStyles_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootTagsArgs = {
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Query_RootTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Query_RootTags_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUsers_GenresArgs = {
  distinct_on?: InputMaybe<Array<Users_Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Genres_Order_By>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};


export type Query_RootUsers_Genres_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Genres_Order_By>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};


export type Query_RootUsers_Genres_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootWidgetsArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Order_By>>;
  where?: InputMaybe<Widgets_Bool_Exp>;
};


export type Query_RootWidgets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Order_By>>;
  where?: InputMaybe<Widgets_Bool_Exp>;
};


export type Query_RootWidgets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWidgets_LinksArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Links_Order_By>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};


export type Query_RootWidgets_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Links_Order_By>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};


export type Query_RootWidgets_Links_By_PkArgs = {
  id: Scalars['bigint']['input'];
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['smallint']['input']>;
  _gt?: InputMaybe<Scalars['smallint']['input']>;
  _gte?: InputMaybe<Scalars['smallint']['input']>;
  _in?: InputMaybe<Array<Scalars['smallint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['smallint']['input']>;
  _lte?: InputMaybe<Scalars['smallint']['input']>;
  _neq?: InputMaybe<Scalars['smallint']['input']>;
  _nin?: InputMaybe<Array<Scalars['smallint']['input']>>;
};

/** columns and relationships of "styles" */
export type Styles = {
  __typename?: 'styles';
  created_at: Scalars['timestamptz']['output'];
  css?: Maybe<Scalars['json']['output']>;
  id: Scalars['bigint']['output'];
  image_bucket_id?: Maybe<Scalars['String']['output']>;
  image_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "styles" */
export type StylesCssArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "styles" */
export type Styles_Aggregate = {
  __typename?: 'styles_aggregate';
  aggregate?: Maybe<Styles_Aggregate_Fields>;
  nodes: Array<Styles>;
};

/** aggregate fields of "styles" */
export type Styles_Aggregate_Fields = {
  __typename?: 'styles_aggregate_fields';
  avg?: Maybe<Styles_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Styles_Max_Fields>;
  min?: Maybe<Styles_Min_Fields>;
  stddev?: Maybe<Styles_Stddev_Fields>;
  stddev_pop?: Maybe<Styles_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Styles_Stddev_Samp_Fields>;
  sum?: Maybe<Styles_Sum_Fields>;
  var_pop?: Maybe<Styles_Var_Pop_Fields>;
  var_samp?: Maybe<Styles_Var_Samp_Fields>;
  variance?: Maybe<Styles_Variance_Fields>;
};


/** aggregate fields of "styles" */
export type Styles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Styles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Styles_Avg_Fields = {
  __typename?: 'styles_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "styles". All fields are combined with a logical 'AND'. */
export type Styles_Bool_Exp = {
  _and?: InputMaybe<Array<Styles_Bool_Exp>>;
  _not?: InputMaybe<Styles_Bool_Exp>;
  _or?: InputMaybe<Array<Styles_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  css?: InputMaybe<Json_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  image_bucket_id?: InputMaybe<String_Comparison_Exp>;
  image_name?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "styles" */
export enum Styles_Constraint {
  /** unique or primary key constraint on columns "id" */
  StylesPkey = 'styles_pkey'
}

/** input type for incrementing numeric columns in table "styles" */
export type Styles_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "styles" */
export type Styles_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  css?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_bucket_id?: InputMaybe<Scalars['String']['input']>;
  image_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Styles_Max_Fields = {
  __typename?: 'styles_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  image_bucket_id?: Maybe<Scalars['String']['output']>;
  image_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Styles_Min_Fields = {
  __typename?: 'styles_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  image_bucket_id?: Maybe<Scalars['String']['output']>;
  image_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "styles" */
export type Styles_Mutation_Response = {
  __typename?: 'styles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Styles>;
};

/** on_conflict condition type for table "styles" */
export type Styles_On_Conflict = {
  constraint: Styles_Constraint;
  update_columns?: Array<Styles_Update_Column>;
  where?: InputMaybe<Styles_Bool_Exp>;
};

/** Ordering options when selecting data from "styles". */
export type Styles_Order_By = {
  created_at?: InputMaybe<Order_By>;
  css?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_bucket_id?: InputMaybe<Order_By>;
  image_name?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: styles */
export type Styles_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "styles" */
export enum Styles_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Css = 'css',
  /** column name */
  Id = 'id',
  /** column name */
  ImageBucketId = 'image_bucket_id',
  /** column name */
  ImageName = 'image_name',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "styles" */
export type Styles_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  css?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_bucket_id?: InputMaybe<Scalars['String']['input']>;
  image_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Styles_Stddev_Fields = {
  __typename?: 'styles_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Styles_Stddev_Pop_Fields = {
  __typename?: 'styles_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Styles_Stddev_Samp_Fields = {
  __typename?: 'styles_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "styles" */
export type Styles_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Styles_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Styles_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  css?: InputMaybe<Scalars['json']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  image_bucket_id?: InputMaybe<Scalars['String']['input']>;
  image_name?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Styles_Sum_Fields = {
  __typename?: 'styles_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** update columns of table "styles" */
export enum Styles_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Css = 'css',
  /** column name */
  Id = 'id',
  /** column name */
  ImageBucketId = 'image_bucket_id',
  /** column name */
  ImageName = 'image_name',
  /** column name */
  Name = 'name'
}

export type Styles_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Styles_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Styles_Set_Input>;
  /** filter the rows which have to be updated */
  where: Styles_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Styles_Var_Pop_Fields = {
  __typename?: 'styles_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Styles_Var_Samp_Fields = {
  __typename?: 'styles_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Styles_Variance_Fields = {
  __typename?: 'styles_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "genres" */
  genres: Array<Genres>;
  /** fetch aggregated fields from the table: "genres" */
  genres_aggregate: Genres_Aggregate;
  /** fetch data from the table: "genres" using primary key columns */
  genres_by_pk?: Maybe<Genres>;
  /** fetch data from the table in a streaming manner: "genres" */
  genres_stream: Array<Genres>;
  /** An array relationship */
  links: Array<Links>;
  /** An aggregate relationship */
  links_aggregate: Links_Aggregate;
  /** fetch data from the table: "links" using primary key columns */
  links_by_pk?: Maybe<Links>;
  /** An array relationship */
  links_photos: Array<Links_Photos>;
  /** An aggregate relationship */
  links_photos_aggregate: Links_Photos_Aggregate;
  /** fetch data from the table: "links_photos" using primary key columns */
  links_photos_by_pk?: Maybe<Links_Photos>;
  /** fetch data from the table in a streaming manner: "links_photos" */
  links_photos_stream: Array<Links_Photos>;
  /** fetch data from the table in a streaming manner: "links" */
  links_stream: Array<Links>;
  /** An array relationship */
  links_tags: Array<Links_Tags>;
  /** An aggregate relationship */
  links_tags_aggregate: Links_Tags_Aggregate;
  /** fetch data from the table: "links_tags" using primary key columns */
  links_tags_by_pk?: Maybe<Links_Tags>;
  /** fetch data from the table in a streaming manner: "links_tags" */
  links_tags_stream: Array<Links_Tags>;
  /** An array relationship */
  pages: Array<Pages>;
  /** An aggregate relationship */
  pages_aggregate: Pages_Aggregate;
  /** fetch data from the table: "pages" using primary key columns */
  pages_by_pk?: Maybe<Pages>;
  /** fetch data from the table in a streaming manner: "pages" */
  pages_stream: Array<Pages>;
  /** fetch data from the table: "styles" */
  styles: Array<Styles>;
  /** fetch aggregated fields from the table: "styles" */
  styles_aggregate: Styles_Aggregate;
  /** fetch data from the table: "styles" using primary key columns */
  styles_by_pk?: Maybe<Styles>;
  /** fetch data from the table in a streaming manner: "styles" */
  styles_stream: Array<Styles>;
  /** An array relationship */
  tags: Array<Tags>;
  /** An aggregate relationship */
  tags_aggregate: Tags_Aggregate;
  /** fetch data from the table: "tags" using primary key columns */
  tags_by_pk?: Maybe<Tags>;
  /** fetch data from the table in a streaming manner: "tags" */
  tags_stream: Array<Tags>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** An array relationship */
  users_genres: Array<Users_Genres>;
  /** An aggregate relationship */
  users_genres_aggregate: Users_Genres_Aggregate;
  /** fetch data from the table: "users_genres" using primary key columns */
  users_genres_by_pk?: Maybe<Users_Genres>;
  /** fetch data from the table in a streaming manner: "users_genres" */
  users_genres_stream: Array<Users_Genres>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
  /** An array relationship */
  widgets: Array<Widgets>;
  /** An aggregate relationship */
  widgets_aggregate: Widgets_Aggregate;
  /** fetch data from the table: "widgets" using primary key columns */
  widgets_by_pk?: Maybe<Widgets>;
  /** An array relationship */
  widgets_links: Array<Widgets_Links>;
  /** An aggregate relationship */
  widgets_links_aggregate: Widgets_Links_Aggregate;
  /** fetch data from the table: "widgets_links" using primary key columns */
  widgets_links_by_pk?: Maybe<Widgets_Links>;
  /** fetch data from the table in a streaming manner: "widgets_links" */
  widgets_links_stream: Array<Widgets_Links>;
  /** fetch data from the table in a streaming manner: "widgets" */
  widgets_stream: Array<Widgets>;
};


export type Subscription_RootGenresArgs = {
  distinct_on?: InputMaybe<Array<Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Genres_Order_By>>;
  where?: InputMaybe<Genres_Bool_Exp>;
};


export type Subscription_RootGenres_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Genres_Order_By>>;
  where?: InputMaybe<Genres_Bool_Exp>;
};


export type Subscription_RootGenres_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootGenres_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Genres_Stream_Cursor_Input>>;
  where?: InputMaybe<Genres_Bool_Exp>;
};


export type Subscription_RootLinksArgs = {
  distinct_on?: InputMaybe<Array<Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Order_By>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


export type Subscription_RootLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Order_By>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


export type Subscription_RootLinks_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootLinks_PhotosArgs = {
  distinct_on?: InputMaybe<Array<Links_Photos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Photos_Order_By>>;
  where?: InputMaybe<Links_Photos_Bool_Exp>;
};


export type Subscription_RootLinks_Photos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Photos_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Photos_Order_By>>;
  where?: InputMaybe<Links_Photos_Bool_Exp>;
};


export type Subscription_RootLinks_Photos_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootLinks_Photos_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Links_Photos_Stream_Cursor_Input>>;
  where?: InputMaybe<Links_Photos_Bool_Exp>;
};


export type Subscription_RootLinks_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Links_Stream_Cursor_Input>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


export type Subscription_RootLinks_TagsArgs = {
  distinct_on?: InputMaybe<Array<Links_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Tags_Order_By>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};


export type Subscription_RootLinks_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Tags_Order_By>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};


export type Subscription_RootLinks_Tags_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootLinks_Tags_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Links_Tags_Stream_Cursor_Input>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};


export type Subscription_RootPagesArgs = {
  distinct_on?: InputMaybe<Array<Pages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pages_Order_By>>;
  where?: InputMaybe<Pages_Bool_Exp>;
};


export type Subscription_RootPages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pages_Order_By>>;
  where?: InputMaybe<Pages_Bool_Exp>;
};


export type Subscription_RootPages_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootPages_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Pages_Stream_Cursor_Input>>;
  where?: InputMaybe<Pages_Bool_Exp>;
};


export type Subscription_RootStylesArgs = {
  distinct_on?: InputMaybe<Array<Styles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Styles_Order_By>>;
  where?: InputMaybe<Styles_Bool_Exp>;
};


export type Subscription_RootStyles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Styles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Styles_Order_By>>;
  where?: InputMaybe<Styles_Bool_Exp>;
};


export type Subscription_RootStyles_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootStyles_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Styles_Stream_Cursor_Input>>;
  where?: InputMaybe<Styles_Bool_Exp>;
};


export type Subscription_RootTagsArgs = {
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Subscription_RootTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Subscription_RootTags_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootTags_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Tags_Stream_Cursor_Input>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUsers_GenresArgs = {
  distinct_on?: InputMaybe<Array<Users_Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Genres_Order_By>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};


export type Subscription_RootUsers_Genres_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Genres_Order_By>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};


export type Subscription_RootUsers_Genres_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootUsers_Genres_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Genres_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootWidgetsArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Order_By>>;
  where?: InputMaybe<Widgets_Bool_Exp>;
};


export type Subscription_RootWidgets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Order_By>>;
  where?: InputMaybe<Widgets_Bool_Exp>;
};


export type Subscription_RootWidgets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWidgets_LinksArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Links_Order_By>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};


export type Subscription_RootWidgets_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Links_Order_By>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};


export type Subscription_RootWidgets_Links_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootWidgets_Links_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Widgets_Links_Stream_Cursor_Input>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};


export type Subscription_RootWidgets_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Widgets_Stream_Cursor_Input>>;
  where?: InputMaybe<Widgets_Bool_Exp>;
};

/** columns and relationships of "tags" */
export type Tags = {
  __typename?: 'tags';
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['bigint']['output'];
  /** An array relationship */
  links_tags: Array<Links_Tags>;
  /** An aggregate relationship */
  links_tags_aggregate: Links_Tags_Aggregate;
  name?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  userByUser?: Maybe<Users>;
};


/** columns and relationships of "tags" */
export type TagsLinks_TagsArgs = {
  distinct_on?: InputMaybe<Array<Links_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Tags_Order_By>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};


/** columns and relationships of "tags" */
export type TagsLinks_Tags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Tags_Order_By>>;
  where?: InputMaybe<Links_Tags_Bool_Exp>;
};

/** aggregated selection of "tags" */
export type Tags_Aggregate = {
  __typename?: 'tags_aggregate';
  aggregate?: Maybe<Tags_Aggregate_Fields>;
  nodes: Array<Tags>;
};

export type Tags_Aggregate_Bool_Exp = {
  count?: InputMaybe<Tags_Aggregate_Bool_Exp_Count>;
};

export type Tags_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Tags_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Tags_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "tags" */
export type Tags_Aggregate_Fields = {
  __typename?: 'tags_aggregate_fields';
  avg?: Maybe<Tags_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Tags_Max_Fields>;
  min?: Maybe<Tags_Min_Fields>;
  stddev?: Maybe<Tags_Stddev_Fields>;
  stddev_pop?: Maybe<Tags_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Tags_Stddev_Samp_Fields>;
  sum?: Maybe<Tags_Sum_Fields>;
  var_pop?: Maybe<Tags_Var_Pop_Fields>;
  var_samp?: Maybe<Tags_Var_Samp_Fields>;
  variance?: Maybe<Tags_Variance_Fields>;
};


/** aggregate fields of "tags" */
export type Tags_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tags_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "tags" */
export type Tags_Aggregate_Order_By = {
  avg?: InputMaybe<Tags_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tags_Max_Order_By>;
  min?: InputMaybe<Tags_Min_Order_By>;
  stddev?: InputMaybe<Tags_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tags_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tags_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tags_Sum_Order_By>;
  var_pop?: InputMaybe<Tags_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tags_Var_Samp_Order_By>;
  variance?: InputMaybe<Tags_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "tags" */
export type Tags_Arr_Rel_Insert_Input = {
  data: Array<Tags_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Tags_On_Conflict>;
};

/** aggregate avg on columns */
export type Tags_Avg_Fields = {
  __typename?: 'tags_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "tags" */
export type Tags_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "tags". All fields are combined with a logical 'AND'. */
export type Tags_Bool_Exp = {
  _and?: InputMaybe<Array<Tags_Bool_Exp>>;
  _not?: InputMaybe<Tags_Bool_Exp>;
  _or?: InputMaybe<Array<Tags_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  links_tags?: InputMaybe<Links_Tags_Bool_Exp>;
  links_tags_aggregate?: InputMaybe<Links_Tags_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Uuid_Comparison_Exp>;
  userByUser?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "tags" */
export enum Tags_Constraint {
  /** unique or primary key constraint on columns "id" */
  TagsPkey = 'tags_pkey'
}

/** input type for incrementing numeric columns in table "tags" */
export type Tags_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "tags" */
export type Tags_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  links_tags?: InputMaybe<Links_Tags_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
  userByUser?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Tags_Max_Fields = {
  __typename?: 'tags_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "tags" */
export type Tags_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tags_Min_Fields = {
  __typename?: 'tags_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "tags" */
export type Tags_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "tags" */
export type Tags_Mutation_Response = {
  __typename?: 'tags_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Tags>;
};

/** input type for inserting object relation for remote table "tags" */
export type Tags_Obj_Rel_Insert_Input = {
  data: Tags_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Tags_On_Conflict>;
};

/** on_conflict condition type for table "tags" */
export type Tags_On_Conflict = {
  constraint: Tags_Constraint;
  update_columns?: Array<Tags_Update_Column>;
  where?: InputMaybe<Tags_Bool_Exp>;
};

/** Ordering options when selecting data from "tags". */
export type Tags_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  links_tags_aggregate?: InputMaybe<Links_Tags_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
  userByUser?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: tags */
export type Tags_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "tags" */
export enum Tags_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  User = 'user'
}

/** input type for updating data in table "tags" */
export type Tags_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Tags_Stddev_Fields = {
  __typename?: 'tags_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "tags" */
export type Tags_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Tags_Stddev_Pop_Fields = {
  __typename?: 'tags_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "tags" */
export type Tags_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Tags_Stddev_Samp_Fields = {
  __typename?: 'tags_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "tags" */
export type Tags_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "tags" */
export type Tags_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tags_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tags_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Tags_Sum_Fields = {
  __typename?: 'tags_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "tags" */
export type Tags_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "tags" */
export enum Tags_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  User = 'user'
}

export type Tags_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Tags_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tags_Set_Input>;
  /** filter the rows which have to be updated */
  where: Tags_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Tags_Var_Pop_Fields = {
  __typename?: 'tags_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "tags" */
export type Tags_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Tags_Var_Samp_Fields = {
  __typename?: 'tags_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "tags" */
export type Tags_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Tags_Variance_Fields = {
  __typename?: 'tags_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "tags" */
export type Tags_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  display_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  image?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  links: Array<Links>;
  /** An aggregate relationship */
  links_aggregate: Links_Aggregate;
  name?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  pages: Array<Pages>;
  /** An aggregate relationship */
  pages_aggregate: Pages_Aggregate;
  /** An array relationship */
  tags: Array<Tags>;
  /** An aggregate relationship */
  tags_aggregate: Tags_Aggregate;
  theme?: Maybe<Scalars['jsonb']['output']>;
  theme_selected?: Maybe<Scalars['Boolean']['output']>;
  url_key?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  users_genres: Array<Users_Genres>;
  /** An aggregate relationship */
  users_genres_aggregate: Users_Genres_Aggregate;
  /** An array relationship */
  widgets: Array<Widgets>;
  /** An aggregate relationship */
  widgets_aggregate: Widgets_Aggregate;
};


/** columns and relationships of "users" */
export type UsersLinksArgs = {
  distinct_on?: InputMaybe<Array<Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Order_By>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersLinks_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Links_Order_By>>;
  where?: InputMaybe<Links_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPagesArgs = {
  distinct_on?: InputMaybe<Array<Pages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pages_Order_By>>;
  where?: InputMaybe<Pages_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Pages_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Pages_Order_By>>;
  where?: InputMaybe<Pages_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTagsArgs = {
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTags_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tags_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Tags_Order_By>>;
  where?: InputMaybe<Tags_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersThemeArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "users" */
export type UsersUsers_GenresArgs = {
  distinct_on?: InputMaybe<Array<Users_Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Genres_Order_By>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUsers_Genres_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Genres_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Genres_Order_By>>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWidgetsArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Order_By>>;
  where?: InputMaybe<Widgets_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWidgets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Order_By>>;
  where?: InputMaybe<Widgets_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  theme?: InputMaybe<Scalars['jsonb']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  display_name?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  links?: InputMaybe<Links_Bool_Exp>;
  links_aggregate?: InputMaybe<Links_Aggregate_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  pages?: InputMaybe<Pages_Bool_Exp>;
  pages_aggregate?: InputMaybe<Pages_Aggregate_Bool_Exp>;
  tags?: InputMaybe<Tags_Bool_Exp>;
  tags_aggregate?: InputMaybe<Tags_Aggregate_Bool_Exp>;
  theme?: InputMaybe<Jsonb_Comparison_Exp>;
  theme_selected?: InputMaybe<Boolean_Comparison_Exp>;
  url_key?: InputMaybe<String_Comparison_Exp>;
  users_genres?: InputMaybe<Users_Genres_Bool_Exp>;
  users_genres_aggregate?: InputMaybe<Users_Genres_Aggregate_Bool_Exp>;
  widgets?: InputMaybe<Widgets_Bool_Exp>;
  widgets_aggregate?: InputMaybe<Widgets_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey',
  /** unique or primary key constraint on columns "url_key" */
  UsersUrlKeyKey = 'users_url_key_key'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  theme?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  theme?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  theme?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "users_genres" */
export type Users_Genres = {
  __typename?: 'users_genres';
  /** An object relationship */
  genre?: Maybe<Genres>;
  genre_id?: Maybe<Scalars['bigint']['output']>;
  id: Scalars['bigint']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "users_genres" */
export type Users_Genres_Aggregate = {
  __typename?: 'users_genres_aggregate';
  aggregate?: Maybe<Users_Genres_Aggregate_Fields>;
  nodes: Array<Users_Genres>;
};

export type Users_Genres_Aggregate_Bool_Exp = {
  count?: InputMaybe<Users_Genres_Aggregate_Bool_Exp_Count>;
};

export type Users_Genres_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Users_Genres_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Users_Genres_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "users_genres" */
export type Users_Genres_Aggregate_Fields = {
  __typename?: 'users_genres_aggregate_fields';
  avg?: Maybe<Users_Genres_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Genres_Max_Fields>;
  min?: Maybe<Users_Genres_Min_Fields>;
  stddev?: Maybe<Users_Genres_Stddev_Fields>;
  stddev_pop?: Maybe<Users_Genres_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Users_Genres_Stddev_Samp_Fields>;
  sum?: Maybe<Users_Genres_Sum_Fields>;
  var_pop?: Maybe<Users_Genres_Var_Pop_Fields>;
  var_samp?: Maybe<Users_Genres_Var_Samp_Fields>;
  variance?: Maybe<Users_Genres_Variance_Fields>;
};


/** aggregate fields of "users_genres" */
export type Users_Genres_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Genres_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "users_genres" */
export type Users_Genres_Aggregate_Order_By = {
  avg?: InputMaybe<Users_Genres_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Genres_Max_Order_By>;
  min?: InputMaybe<Users_Genres_Min_Order_By>;
  stddev?: InputMaybe<Users_Genres_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Users_Genres_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Users_Genres_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Users_Genres_Sum_Order_By>;
  var_pop?: InputMaybe<Users_Genres_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Users_Genres_Var_Samp_Order_By>;
  variance?: InputMaybe<Users_Genres_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "users_genres" */
export type Users_Genres_Arr_Rel_Insert_Input = {
  data: Array<Users_Genres_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_Genres_On_Conflict>;
};

/** aggregate avg on columns */
export type Users_Genres_Avg_Fields = {
  __typename?: 'users_genres_avg_fields';
  genre_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "users_genres" */
export type Users_Genres_Avg_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "users_genres". All fields are combined with a logical 'AND'. */
export type Users_Genres_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Genres_Bool_Exp>>;
  _not?: InputMaybe<Users_Genres_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Genres_Bool_Exp>>;
  genre?: InputMaybe<Genres_Bool_Exp>;
  genre_id?: InputMaybe<Bigint_Comparison_Exp>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "users_genres" */
export enum Users_Genres_Constraint {
  /** unique or primary key constraint on columns "id" */
  UsersGenresPkey = 'users_genres_pkey'
}

/** input type for incrementing numeric columns in table "users_genres" */
export type Users_Genres_Inc_Input = {
  genre_id?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "users_genres" */
export type Users_Genres_Insert_Input = {
  genre?: InputMaybe<Genres_Obj_Rel_Insert_Input>;
  genre_id?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Users_Genres_Max_Fields = {
  __typename?: 'users_genres_max_fields';
  genre_id?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "users_genres" */
export type Users_Genres_Max_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Genres_Min_Fields = {
  __typename?: 'users_genres_min_fields';
  genre_id?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "users_genres" */
export type Users_Genres_Min_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users_genres" */
export type Users_Genres_Mutation_Response = {
  __typename?: 'users_genres_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users_Genres>;
};

/** on_conflict condition type for table "users_genres" */
export type Users_Genres_On_Conflict = {
  constraint: Users_Genres_Constraint;
  update_columns?: Array<Users_Genres_Update_Column>;
  where?: InputMaybe<Users_Genres_Bool_Exp>;
};

/** Ordering options when selecting data from "users_genres". */
export type Users_Genres_Order_By = {
  genre?: InputMaybe<Genres_Order_By>;
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users_genres */
export type Users_Genres_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "users_genres" */
export enum Users_Genres_Select_Column {
  /** column name */
  GenreId = 'genre_id',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "users_genres" */
export type Users_Genres_Set_Input = {
  genre_id?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Users_Genres_Stddev_Fields = {
  __typename?: 'users_genres_stddev_fields';
  genre_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "users_genres" */
export type Users_Genres_Stddev_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Users_Genres_Stddev_Pop_Fields = {
  __typename?: 'users_genres_stddev_pop_fields';
  genre_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "users_genres" */
export type Users_Genres_Stddev_Pop_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Users_Genres_Stddev_Samp_Fields = {
  __typename?: 'users_genres_stddev_samp_fields';
  genre_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "users_genres" */
export type Users_Genres_Stddev_Samp_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "users_genres" */
export type Users_Genres_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Genres_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Genres_Stream_Cursor_Value_Input = {
  genre_id?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['bigint']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Users_Genres_Sum_Fields = {
  __typename?: 'users_genres_sum_fields';
  genre_id?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "users_genres" */
export type Users_Genres_Sum_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** update columns of table "users_genres" */
export enum Users_Genres_Update_Column {
  /** column name */
  GenreId = 'genre_id',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

export type Users_Genres_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Users_Genres_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Genres_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Genres_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Users_Genres_Var_Pop_Fields = {
  __typename?: 'users_genres_var_pop_fields';
  genre_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "users_genres" */
export type Users_Genres_Var_Pop_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Users_Genres_Var_Samp_Fields = {
  __typename?: 'users_genres_var_samp_fields';
  genre_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "users_genres" */
export type Users_Genres_Var_Samp_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Users_Genres_Variance_Fields = {
  __typename?: 'users_genres_variance_fields';
  genre_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "users_genres" */
export type Users_Genres_Variance_Order_By = {
  genre_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  display_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Links_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']['input']>;
  pages?: InputMaybe<Pages_Arr_Rel_Insert_Input>;
  tags?: InputMaybe<Tags_Arr_Rel_Insert_Input>;
  theme?: InputMaybe<Scalars['jsonb']['input']>;
  theme_selected?: InputMaybe<Scalars['Boolean']['input']>;
  url_key?: InputMaybe<Scalars['String']['input']>;
  users_genres?: InputMaybe<Users_Genres_Arr_Rel_Insert_Input>;
  widgets?: InputMaybe<Widgets_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  display_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url_key?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  display_name?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  url_key?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  display_name?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  links_aggregate?: InputMaybe<Links_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
  pages_aggregate?: InputMaybe<Pages_Aggregate_Order_By>;
  tags_aggregate?: InputMaybe<Tags_Aggregate_Order_By>;
  theme?: InputMaybe<Order_By>;
  theme_selected?: InputMaybe<Order_By>;
  url_key?: InputMaybe<Order_By>;
  users_genres_aggregate?: InputMaybe<Users_Genres_Aggregate_Order_By>;
  widgets_aggregate?: InputMaybe<Widgets_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  theme?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Theme = 'theme',
  /** column name */
  ThemeSelected = 'theme_selected',
  /** column name */
  UrlKey = 'url_key'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  display_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['jsonb']['input']>;
  theme_selected?: InputMaybe<Scalars['Boolean']['input']>;
  url_key?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  display_name?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  theme?: InputMaybe<Scalars['jsonb']['input']>;
  theme_selected?: InputMaybe<Scalars['Boolean']['input']>;
  url_key?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  DisplayName = 'display_name',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Theme = 'theme',
  /** column name */
  ThemeSelected = 'theme_selected',
  /** column name */
  UrlKey = 'url_key'
}

export type Users_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Users_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Users_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "widgets" */
export type Widgets = {
  __typename?: 'widgets';
  config?: Maybe<Scalars['jsonb']['output']>;
  created_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  isShow?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  userByUser?: Maybe<Users>;
  /** An array relationship */
  widgets_links: Array<Widgets_Links>;
  /** An aggregate relationship */
  widgets_links_aggregate: Widgets_Links_Aggregate;
};


/** columns and relationships of "widgets" */
export type WidgetsConfigArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "widgets" */
export type WidgetsWidgets_LinksArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Links_Order_By>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};


/** columns and relationships of "widgets" */
export type WidgetsWidgets_Links_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widgets_Links_Order_By>>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};

/** aggregated selection of "widgets" */
export type Widgets_Aggregate = {
  __typename?: 'widgets_aggregate';
  aggregate?: Maybe<Widgets_Aggregate_Fields>;
  nodes: Array<Widgets>;
};

export type Widgets_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Widgets_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Widgets_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Widgets_Aggregate_Bool_Exp_Count>;
};

export type Widgets_Aggregate_Bool_Exp_Bool_And = {
  arguments: Widgets_Select_Column_Widgets_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Widgets_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Widgets_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Widgets_Select_Column_Widgets_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Widgets_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Widgets_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Widgets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Widgets_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "widgets" */
export type Widgets_Aggregate_Fields = {
  __typename?: 'widgets_aggregate_fields';
  avg?: Maybe<Widgets_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Widgets_Max_Fields>;
  min?: Maybe<Widgets_Min_Fields>;
  stddev?: Maybe<Widgets_Stddev_Fields>;
  stddev_pop?: Maybe<Widgets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Widgets_Stddev_Samp_Fields>;
  sum?: Maybe<Widgets_Sum_Fields>;
  var_pop?: Maybe<Widgets_Var_Pop_Fields>;
  var_samp?: Maybe<Widgets_Var_Samp_Fields>;
  variance?: Maybe<Widgets_Variance_Fields>;
};


/** aggregate fields of "widgets" */
export type Widgets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Widgets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "widgets" */
export type Widgets_Aggregate_Order_By = {
  avg?: InputMaybe<Widgets_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Widgets_Max_Order_By>;
  min?: InputMaybe<Widgets_Min_Order_By>;
  stddev?: InputMaybe<Widgets_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Widgets_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Widgets_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Widgets_Sum_Order_By>;
  var_pop?: InputMaybe<Widgets_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Widgets_Var_Samp_Order_By>;
  variance?: InputMaybe<Widgets_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Widgets_Append_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "widgets" */
export type Widgets_Arr_Rel_Insert_Input = {
  data: Array<Widgets_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Widgets_On_Conflict>;
};

/** aggregate avg on columns */
export type Widgets_Avg_Fields = {
  __typename?: 'widgets_avg_fields';
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "widgets" */
export type Widgets_Avg_Order_By = {
  sort?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "widgets". All fields are combined with a logical 'AND'. */
export type Widgets_Bool_Exp = {
  _and?: InputMaybe<Array<Widgets_Bool_Exp>>;
  _not?: InputMaybe<Widgets_Bool_Exp>;
  _or?: InputMaybe<Array<Widgets_Bool_Exp>>;
  config?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  isShow?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sort?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<Uuid_Comparison_Exp>;
  userByUser?: InputMaybe<Users_Bool_Exp>;
  widgets_links?: InputMaybe<Widgets_Links_Bool_Exp>;
  widgets_links_aggregate?: InputMaybe<Widgets_Links_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "widgets" */
export enum Widgets_Constraint {
  /** unique or primary key constraint on columns "id" */
  WidgetsPkey = 'widgets_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Widgets_Delete_At_Path_Input = {
  config?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Widgets_Delete_Elem_Input = {
  config?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Widgets_Delete_Key_Input = {
  config?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "widgets" */
export type Widgets_Inc_Input = {
  sort?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "widgets" */
export type Widgets_Insert_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isShow?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
  userByUser?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  widgets_links?: InputMaybe<Widgets_Links_Arr_Rel_Insert_Input>;
};

/** columns and relationships of "widgets_links" */
export type Widgets_Links = {
  __typename?: 'widgets_links';
  id: Scalars['bigint']['output'];
  isShow?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  link?: Maybe<Links>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  widget?: Maybe<Widgets>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "widgets_links" */
export type Widgets_Links_Aggregate = {
  __typename?: 'widgets_links_aggregate';
  aggregate?: Maybe<Widgets_Links_Aggregate_Fields>;
  nodes: Array<Widgets_Links>;
};

export type Widgets_Links_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Widgets_Links_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Widgets_Links_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Widgets_Links_Aggregate_Bool_Exp_Count>;
};

export type Widgets_Links_Aggregate_Bool_Exp_Bool_And = {
  arguments: Widgets_Links_Select_Column_Widgets_Links_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Widgets_Links_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Widgets_Links_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Widgets_Links_Select_Column_Widgets_Links_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Widgets_Links_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Widgets_Links_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Widgets_Links_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "widgets_links" */
export type Widgets_Links_Aggregate_Fields = {
  __typename?: 'widgets_links_aggregate_fields';
  avg?: Maybe<Widgets_Links_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Widgets_Links_Max_Fields>;
  min?: Maybe<Widgets_Links_Min_Fields>;
  stddev?: Maybe<Widgets_Links_Stddev_Fields>;
  stddev_pop?: Maybe<Widgets_Links_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Widgets_Links_Stddev_Samp_Fields>;
  sum?: Maybe<Widgets_Links_Sum_Fields>;
  var_pop?: Maybe<Widgets_Links_Var_Pop_Fields>;
  var_samp?: Maybe<Widgets_Links_Var_Samp_Fields>;
  variance?: Maybe<Widgets_Links_Variance_Fields>;
};


/** aggregate fields of "widgets_links" */
export type Widgets_Links_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Widgets_Links_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "widgets_links" */
export type Widgets_Links_Aggregate_Order_By = {
  avg?: InputMaybe<Widgets_Links_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Widgets_Links_Max_Order_By>;
  min?: InputMaybe<Widgets_Links_Min_Order_By>;
  stddev?: InputMaybe<Widgets_Links_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Widgets_Links_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Widgets_Links_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Widgets_Links_Sum_Order_By>;
  var_pop?: InputMaybe<Widgets_Links_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Widgets_Links_Var_Samp_Order_By>;
  variance?: InputMaybe<Widgets_Links_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "widgets_links" */
export type Widgets_Links_Arr_Rel_Insert_Input = {
  data: Array<Widgets_Links_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Widgets_Links_On_Conflict>;
};

/** aggregate avg on columns */
export type Widgets_Links_Avg_Fields = {
  __typename?: 'widgets_links_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "widgets_links" */
export type Widgets_Links_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "widgets_links". All fields are combined with a logical 'AND'. */
export type Widgets_Links_Bool_Exp = {
  _and?: InputMaybe<Array<Widgets_Links_Bool_Exp>>;
  _not?: InputMaybe<Widgets_Links_Bool_Exp>;
  _or?: InputMaybe<Array<Widgets_Links_Bool_Exp>>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  isShow?: InputMaybe<Boolean_Comparison_Exp>;
  link?: InputMaybe<Links_Bool_Exp>;
  link_id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sort?: InputMaybe<Int_Comparison_Exp>;
  widget?: InputMaybe<Widgets_Bool_Exp>;
  widget_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "widgets_links" */
export enum Widgets_Links_Constraint {
  /** unique or primary key constraint on columns "id" */
  WidgetsLinksPkey = 'widgets_links_pkey'
}

/** input type for incrementing numeric columns in table "widgets_links" */
export type Widgets_Links_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "widgets_links" */
export type Widgets_Links_Insert_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  isShow?: InputMaybe<Scalars['Boolean']['input']>;
  link?: InputMaybe<Links_Obj_Rel_Insert_Input>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  widget?: InputMaybe<Widgets_Obj_Rel_Insert_Input>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Widgets_Links_Max_Fields = {
  __typename?: 'widgets_links_max_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "widgets_links" */
export type Widgets_Links_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  link_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  widget_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Widgets_Links_Min_Fields = {
  __typename?: 'widgets_links_min_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  link_id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "widgets_links" */
export type Widgets_Links_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  link_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  widget_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "widgets_links" */
export type Widgets_Links_Mutation_Response = {
  __typename?: 'widgets_links_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Widgets_Links>;
};

/** on_conflict condition type for table "widgets_links" */
export type Widgets_Links_On_Conflict = {
  constraint: Widgets_Links_Constraint;
  update_columns?: Array<Widgets_Links_Update_Column>;
  where?: InputMaybe<Widgets_Links_Bool_Exp>;
};

/** Ordering options when selecting data from "widgets_links". */
export type Widgets_Links_Order_By = {
  id?: InputMaybe<Order_By>;
  isShow?: InputMaybe<Order_By>;
  link?: InputMaybe<Links_Order_By>;
  link_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  widget?: InputMaybe<Widgets_Order_By>;
  widget_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: widgets_links */
export type Widgets_Links_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "widgets_links" */
export enum Widgets_Links_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsShow = 'isShow',
  /** column name */
  LinkId = 'link_id',
  /** column name */
  Name = 'name',
  /** column name */
  Sort = 'sort',
  /** column name */
  WidgetId = 'widget_id'
}

/** select "widgets_links_aggregate_bool_exp_bool_and_arguments_columns" columns of table "widgets_links" */
export enum Widgets_Links_Select_Column_Widgets_Links_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsShow = 'isShow'
}

/** select "widgets_links_aggregate_bool_exp_bool_or_arguments_columns" columns of table "widgets_links" */
export enum Widgets_Links_Select_Column_Widgets_Links_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsShow = 'isShow'
}

/** input type for updating data in table "widgets_links" */
export type Widgets_Links_Set_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  isShow?: InputMaybe<Scalars['Boolean']['input']>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Widgets_Links_Stddev_Fields = {
  __typename?: 'widgets_links_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "widgets_links" */
export type Widgets_Links_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Widgets_Links_Stddev_Pop_Fields = {
  __typename?: 'widgets_links_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "widgets_links" */
export type Widgets_Links_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Widgets_Links_Stddev_Samp_Fields = {
  __typename?: 'widgets_links_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "widgets_links" */
export type Widgets_Links_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "widgets_links" */
export type Widgets_Links_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Widgets_Links_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Widgets_Links_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  isShow?: InputMaybe<Scalars['Boolean']['input']>;
  link_id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Widgets_Links_Sum_Fields = {
  __typename?: 'widgets_links_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "widgets_links" */
export type Widgets_Links_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** update columns of table "widgets_links" */
export enum Widgets_Links_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  IsShow = 'isShow',
  /** column name */
  LinkId = 'link_id',
  /** column name */
  Name = 'name',
  /** column name */
  Sort = 'sort',
  /** column name */
  WidgetId = 'widget_id'
}

export type Widgets_Links_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Widgets_Links_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Widgets_Links_Set_Input>;
  /** filter the rows which have to be updated */
  where: Widgets_Links_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Widgets_Links_Var_Pop_Fields = {
  __typename?: 'widgets_links_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "widgets_links" */
export type Widgets_Links_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Widgets_Links_Var_Samp_Fields = {
  __typename?: 'widgets_links_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "widgets_links" */
export type Widgets_Links_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Widgets_Links_Variance_Fields = {
  __typename?: 'widgets_links_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "widgets_links" */
export type Widgets_Links_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type Widgets_Max_Fields = {
  __typename?: 'widgets_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "widgets" */
export type Widgets_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Widgets_Min_Fields = {
  __typename?: 'widgets_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sort?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "widgets" */
export type Widgets_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "widgets" */
export type Widgets_Mutation_Response = {
  __typename?: 'widgets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Widgets>;
};

/** input type for inserting object relation for remote table "widgets" */
export type Widgets_Obj_Rel_Insert_Input = {
  data: Widgets_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Widgets_On_Conflict>;
};

/** on_conflict condition type for table "widgets" */
export type Widgets_On_Conflict = {
  constraint: Widgets_Constraint;
  update_columns?: Array<Widgets_Update_Column>;
  where?: InputMaybe<Widgets_Bool_Exp>;
};

/** Ordering options when selecting data from "widgets". */
export type Widgets_Order_By = {
  config?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  isShow?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sort?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<Order_By>;
  userByUser?: InputMaybe<Users_Order_By>;
  widgets_links_aggregate?: InputMaybe<Widgets_Links_Aggregate_Order_By>;
};

/** primary key columns input for table: widgets */
export type Widgets_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Widgets_Prepend_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "widgets" */
export enum Widgets_Select_Column {
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsShow = 'isShow',
  /** column name */
  Name = 'name',
  /** column name */
  Sort = 'sort',
  /** column name */
  Type = 'type',
  /** column name */
  User = 'user'
}

/** select "widgets_aggregate_bool_exp_bool_and_arguments_columns" columns of table "widgets" */
export enum Widgets_Select_Column_Widgets_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsShow = 'isShow'
}

/** select "widgets_aggregate_bool_exp_bool_or_arguments_columns" columns of table "widgets" */
export enum Widgets_Select_Column_Widgets_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsShow = 'isShow'
}

/** input type for updating data in table "widgets" */
export type Widgets_Set_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isShow?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Widgets_Stddev_Fields = {
  __typename?: 'widgets_stddev_fields';
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "widgets" */
export type Widgets_Stddev_Order_By = {
  sort?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Widgets_Stddev_Pop_Fields = {
  __typename?: 'widgets_stddev_pop_fields';
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "widgets" */
export type Widgets_Stddev_Pop_Order_By = {
  sort?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Widgets_Stddev_Samp_Fields = {
  __typename?: 'widgets_stddev_samp_fields';
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "widgets" */
export type Widgets_Stddev_Samp_Order_By = {
  sort?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "widgets" */
export type Widgets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Widgets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Widgets_Stream_Cursor_Value_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  isShow?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Widgets_Sum_Fields = {
  __typename?: 'widgets_sum_fields';
  sort?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "widgets" */
export type Widgets_Sum_Order_By = {
  sort?: InputMaybe<Order_By>;
};

/** update columns of table "widgets" */
export enum Widgets_Update_Column {
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IsShow = 'isShow',
  /** column name */
  Name = 'name',
  /** column name */
  Sort = 'sort',
  /** column name */
  Type = 'type',
  /** column name */
  User = 'user'
}

export type Widgets_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Widgets_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Widgets_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Widgets_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Widgets_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Widgets_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Widgets_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Widgets_Set_Input>;
  /** filter the rows which have to be updated */
  where: Widgets_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Widgets_Var_Pop_Fields = {
  __typename?: 'widgets_var_pop_fields';
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "widgets" */
export type Widgets_Var_Pop_Order_By = {
  sort?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Widgets_Var_Samp_Fields = {
  __typename?: 'widgets_var_samp_fields';
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "widgets" */
export type Widgets_Var_Samp_Order_By = {
  sort?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Widgets_Variance_Fields = {
  __typename?: 'widgets_variance_fields';
  sort?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "widgets" */
export type Widgets_Variance_Order_By = {
  sort?: InputMaybe<Order_By>;
};
