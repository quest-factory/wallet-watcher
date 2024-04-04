export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      addresses: {
        Row: {
          address: string;
          alert_enabled: boolean;
          balance: number;
          id: number;
          name: string;
          previous_balance: number;
          user_id: string;
        };
        Insert: {
          address: string;
          alert_enabled?: boolean;
          balance?: number;
          id?: number;
          name: string;
          previous_balance?: number;
          user_id?: string;
        };
        Update: {
          address?: string;
          alert_enabled?: boolean;
          balance?: number;
          id?: number;
          name?: string;
          previous_balance?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_addresses_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      edges: {
        Row: {
          id: string;
          label: string;
          source: string;
          target: string;
        };
        Insert: {
          id?: string;
          label?: string;
          source?: string;
          target?: string;
        };
        Update: {
          id?: string;
          label?: string;
          source?: string;
          target?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_edges_source_fkey';
            columns: ['source'];
            isOneToOne: false;
            referencedRelation: 'nodes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_edges_target_fkey';
            columns: ['target'];
            isOneToOne: false;
            referencedRelation: 'nodes';
            referencedColumns: ['id'];
          },
        ];
      };
      nodes: {
        Row: {
          address: string | null;
          id: string;
          name: string;
          position: Json;
          siren: string | null;
        };
        Insert: {
          address?: string | null;
          id?: string;
          name?: string;
          position?: Json;
          siren?: string | null;
        };
        Update: {
          address?: string | null;
          id?: string;
          name?: string;
          position?: Json;
          siren?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          email: string;
          id: string;
        };
        Insert: {
          email: string;
          id: string;
        };
        Update: {
          email?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
